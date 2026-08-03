#Requires -Version 5.1
<#
  Upload the two HostSec Nginx site configurations with SCP, install them in
  /etc/nginx/sites-enabled, validate Nginx, and reload only after validation.

  Git Bash provides scp/ssh. The configured PuTTY .ppk key is loaded into a
  temporary Pageant process and exposed to OpenSSH through ssh-pageant.

  Examples:
    .\update-hostsec-nginx.ps1 -WhatIf
    .\update-hostsec-nginx.ps1
    .\update-hostsec-nginx.ps1 -BatchMode
#>
param(
    [ValidateNotNullOrEmpty()]
    [string]$Server = '35.221.234.42',

    [ValidateNotNullOrEmpty()]
    [string]$SshUser = 'ubuntu',

    [ValidateNotNullOrEmpty()]
    [string]$KeyFile = 'hostsec\35.221.234.42.ppk',

    [switch]$BatchMode,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

$OpsDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$KeyPath = if ([IO.Path]::IsPathRooted($KeyFile)) { $KeyFile } else { Join-Path $OpsDir $KeyFile }
$Target = "${SshUser}@${Server}"
$ReleaseId = Get-Date -Format 'yyyyMMddHHmmss'
$RemoteDirectory = '/etc/nginx/sites-enabled'
$Configs = @(
    [PSCustomObject]@{
        Source = Join-Path $OpsDir 'hostsec\hostsec.erjinyi.com.conf'
        Name = 'hostsec.erjinyi.com.conf'
    },
    [PSCustomObject]@{
        Source = Join-Path $OpsDir 'hostsec\hostsec.gcsa.org.conf'
        Name = 'hostsec.gcsa.org.conf'
    }
)

function Assert-LastExitCode {
    param([string]$Message)

    if ($LASTEXITCODE -ne 0) {
        throw $Message
    }
}

function Assert-SafeHostValue {
    param([string]$Name, [string]$Value)

    if ($Value -notmatch '^[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?$') {
        throw "$Name contains unsupported characters: $Value"
    }
}

function Assert-NginxConfig {
    param([string]$Path, [string]$ExpectedServerName)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Nginx configuration does not exist: $Path"
    }

    $content = Get-Content -LiteralPath $Path -Raw
    $openBraces = ([regex]::Matches($content, '\{')).Count
    $closeBraces = ([regex]::Matches($content, '\}')).Count
    if ($openBraces -eq 0 -or $openBraces -ne $closeBraces) {
        throw "Nginx configuration has unbalanced blocks: $Path"
    }
    if ($content -notmatch "(?m)^\s*server_name\s+$([regex]::Escape($ExpectedServerName))\s*;") {
        throw "Expected server_name was not found in $Path"
    }
}

function Resolve-GitBash {
    $command = Get-Command 'bash.exe' -ErrorAction SilentlyContinue
    if ($command -and $command.Source -match '(?i)[\\/]git[\\/].*bash\.exe$') {
        return $command.Source
    }

    $candidates = @(
        'C:\Program Files\Git\bin\bash.exe',
        'C:\programs\git\bin\bash.exe',
        $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'Git\bin\bash.exe' })
    ) | Where-Object { $_ -and (Test-Path -LiteralPath $_ -PathType Leaf) }

    if ($candidates.Count -gt 0) {
        return $candidates[0]
    }

    throw 'Git Bash was not found. Install Git for Windows or add Git\bin to PATH.'
}

function Resolve-Pageant {
    $command = Get-Command 'pageant.exe' -ErrorAction SilentlyContinue
    if ($command) {
        return $command.Source
    }

    $candidates = @(
        'C:\Program Files\TortoiseGit\bin\pageant.exe',
        'C:\Program Files\PuTTY\pageant.exe',
        $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'TortoiseGit\bin\pageant.exe' }),
        $(if (${env:ProgramFiles(x86)}) { Join-Path ${env:ProgramFiles(x86)} 'PuTTY\pageant.exe' })
    ) | Where-Object { $_ -and (Test-Path -LiteralPath $_ -PathType Leaf) }

    if ($candidates.Count -gt 0) {
        return $candidates[0]
    }

    throw 'pageant.exe was not found. TortoiseGit Pageant or PuTTY Pageant is required to load the configured .ppk key.'
}

function ConvertTo-BashPath {
    param([string]$BashPath, [string]$WindowsPath)

    $converted = & $BashPath -lc 'cygpath -u "$1"' -- $WindowsPath
    Assert-LastExitCode "Failed to convert path for Git Bash: $WindowsPath"
    return ($converted | Select-Object -First 1).Trim()
}

function Quote-Bash {
    param([string]$Value)

    return "'" + ($Value -replace "'", "'\''") + "'"
}

Assert-SafeHostValue -Name 'Server' -Value $Server
if ($SshUser -notmatch '^[A-Za-z_][A-Za-z0-9_-]*$') {
    throw "SSH user contains unsupported characters: $SshUser"
}
if (-not (Test-Path -LiteralPath $KeyPath -PathType Leaf)) {
    throw "PuTTY key does not exist: $KeyPath"
}
if ((Get-Content -LiteralPath $KeyPath -TotalCount 1) -notlike 'PuTTY-User-Key-File-*') {
    throw "The configured key is not a PuTTY .ppk file: $KeyPath"
}
foreach ($config in $Configs) {
    Assert-NginxConfig -Path $config.Source -ExpectedServerName ($config.Name -replace '\.conf$', '')
}

$remoteUploads = @{}
foreach ($config in $Configs) {
    $remoteUploads[$config.Name] = "/tmp/hostsec-nginx-$ReleaseId-$($config.Name)"
}

Write-Host '========================================' -ForegroundColor Yellow
Write-Host " HostSec Nginx update -> $Target" -ForegroundColor Yellow
Write-Host " Destination: $RemoteDirectory" -ForegroundColor Yellow
Write-Host " Mode: $(if ($WhatIf) { 'WhatIf' } else { 'publish' })" -ForegroundColor Yellow
Write-Host '========================================' -ForegroundColor Yellow

if ($WhatIf) {
    Write-Host "    load $KeyPath into a temporary Pageant process" -ForegroundColor DarkGray
    foreach ($config in $Configs) {
        Write-Host "    Git Bash: scp $($config.Source) ${Target}:$($remoteUploads[$config.Name])" -ForegroundColor DarkGray
    }
    Write-Host "    Git Bash: ssh $Target" -ForegroundColor DarkGray
    Write-Host "    install both files in $RemoteDirectory" -ForegroundColor DarkGray
    Write-Host '    sudo nginx -t' -ForegroundColor DarkGray
    Write-Host '    sudo systemctl reload nginx' -ForegroundColor DarkGray
    Write-Host ''
    Write-Host 'Dry run completed; no remote changes were made.' -ForegroundColor Green
    return
}

$backupDirectory = "/etc/nginx/.hostsec-sites-enabled-backup-$ReleaseId"
$remoteScript = @'
set -euo pipefail
destination=__DESTINATION__
backup=__BACKUP__
erjinyi_upload=__ERJINYI_UPLOAD__
gcsa_upload=__GCSA_UPLOAD__
erjinyi_name=hostsec.erjinyi.com.conf
gcsa_name=hostsec.gcsa.org.conf

restore_file() {
  name=$1
  rm -f "$destination/$name"
  if [ -e "$backup/$name" ] || [ -L "$backup/$name" ]; then
    cp -a "$backup/$name" "$destination/$name"
  fi
}

rollback() {
  status=$?
  set +e
  restore_file "$erjinyi_name"
  restore_file "$gcsa_name"
  nginx -t >/dev/null 2>&1 && systemctl reload nginx >/dev/null 2>&1
  rm -rf "$backup"
  rm -f "$erjinyi_upload" "$gcsa_upload"
  exit "$status"
}
trap rollback ERR

install -d -o root -g root -m 0755 "$destination"
install -d -o root -g root -m 0700 "$backup"

for name in "$erjinyi_name" "$gcsa_name"; do
  if [ -e "$destination/$name" ] || [ -L "$destination/$name" ]; then
    cp -a "$destination/$name" "$backup/$name"
  fi
done

install -o root -g root -m 0644 "$erjinyi_upload" "$destination/.$erjinyi_name.new"
install -o root -g root -m 0644 "$gcsa_upload" "$destination/.$gcsa_name.new"
mv -f "$destination/.$erjinyi_name.new" "$destination/$erjinyi_name"
mv -f "$destination/.$gcsa_name.new" "$destination/$gcsa_name"

nginx -t
systemctl reload nginx

rm -rf "$backup"
rm -f "$erjinyi_upload" "$gcsa_upload"
trap - ERR
'@
$remoteScript = $remoteScript.Replace('__DESTINATION__', (Quote-Bash $RemoteDirectory))
$remoteScript = $remoteScript.Replace('__BACKUP__', (Quote-Bash $backupDirectory))
$remoteScript = $remoteScript.Replace('__ERJINYI_UPLOAD__', (Quote-Bash $remoteUploads['hostsec.erjinyi.com.conf']))
$remoteScript = $remoteScript.Replace('__GCSA_UPLOAD__', (Quote-Bash $remoteUploads['hostsec.gcsa.org.conf']))
$remoteCommand = 'sudo bash -lc ' + (Quote-Bash $remoteScript)

$bash = Resolve-GitBash
$pageantPath = Resolve-Pageant
$pageantSocket = "/tmp/ssh-pageant-hostsec-nginx-$ReleaseId"
$pageant = $null

try {
    & $bash -lc 'command -v ssh >/dev/null && command -v scp >/dev/null && command -v ssh-pageant >/dev/null'
    Assert-LastExitCode 'Git Bash must provide ssh, scp, and ssh-pageant'

    Write-Host 'Loading the PuTTY key for Git Bash OpenSSH...' -ForegroundColor Cyan
    $pageant = Start-Process -FilePath $pageantPath -ArgumentList @($KeyPath) -PassThru -WindowStyle Hidden
    Start-Sleep -Milliseconds 800

    $batchOption = if ($BatchMode) { 'yes' } else { 'no' }
    foreach ($config in $Configs) {
        $bashSource = ConvertTo-BashPath -BashPath $bash -WindowsPath $config.Source
        $remoteTarget = "${Target}:$($remoteUploads[$config.Name])"
        Write-Host "Uploading $($config.Name)..." -ForegroundColor Cyan
        & $bash -lc 'eval "$(ssh-pageant -s -r -a "$1")" >/dev/null; scp -o StrictHostKeyChecking=accept-new -o BatchMode="$2" "$3" "$4"; code=$?; ssh-pageant -k >/dev/null 2>&1 || true; exit $code' -- $pageantSocket $batchOption $bashSource $remoteTarget
        Assert-LastExitCode "Failed to upload $($config.Name)"
    }

    Write-Host 'Installing configurations and validating Nginx...' -ForegroundColor Cyan
    & $bash -lc 'eval "$(ssh-pageant -s -r -a "$1")" >/dev/null; ssh -o StrictHostKeyChecking=accept-new -o BatchMode="$2" "$3" "$4"; code=$?; ssh-pageant -k >/dev/null 2>&1 || true; exit $code' -- $pageantSocket $batchOption $Target $remoteCommand
    Assert-LastExitCode 'HostSec Nginx update failed; previous configurations were restored'
}
finally {
    if ($pageant -and -not $pageant.HasExited) {
        Stop-Process -Id $pageant.Id -Force
    }
}

Write-Host ''
Write-Host 'HostSec Nginx configurations updated and reloaded successfully.' -ForegroundColor Green
