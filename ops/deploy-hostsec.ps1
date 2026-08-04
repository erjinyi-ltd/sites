#Requires -Version 5.1
<#
  Build and publish the HostSec introduction site to /var/www/hostsec.

  The default key is an OpenSSH-compatible PEM private key. This script uses
  the native ssh.exe and scp.exe clients.

  Examples:
    .\deploy-hostsec.ps1 -WhatIf
    .\deploy-hostsec.ps1
    .\deploy-hostsec.ps1 -SkipBuild -BatchMode
#>
param(
    [ValidateNotNullOrEmpty()]
    [string]$Server = '35.221.234.42',

    [ValidateNotNullOrEmpty()]
    [string]$SshUser = 'ubuntu',

    [ValidateNotNullOrEmpty()]
    [string]$KeyFile = 'hostsec\35.221.234.42.pem',

    [ValidateNotNullOrEmpty()]
    [string]$RemotePath = '/var/www/hostsec',

    [switch]$BatchMode,
    [switch]$SkipBuild,
    [switch]$VerifyRoutes,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

$OpsDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$RepoDir = Split-Path -Parent $OpsDir
$ProjectDir = Join-Path $RepoDir 'hostsec'
$DistDir = Join-Path $ProjectDir 'dist'
$KeyPath = if ([IO.Path]::IsPathRooted($KeyFile)) { $KeyFile } else { Join-Path $OpsDir $KeyFile }
$Target = "${SshUser}@${Server}"
$ReleaseId = Get-Date -Format 'yyyyMMddHHmmss'
$ArchiveName = "hostsec-site-$ReleaseId.tar.gz"
$ArchivePath = Join-Path ([IO.Path]::GetTempPath()) $ArchiveName
$RemoteArchive = "/tmp/$ArchiveName"

function Assert-LastExitCode {
    param([string]$Message)

    if ($LASTEXITCODE -ne 0) {
        throw $Message
    }
}

function Assert-SafeRemotePath {
    param([string]$Path)

    if ($Path -match "[`r`n]") {
        throw 'Remote path cannot contain line breaks'
    }
    if (-not $Path.StartsWith('/')) {
        throw "Remote path must be absolute: $Path"
    }

    $normalized = $Path.TrimEnd('/')
    $blocked = @('', '/', '/var', '/var/www', '/home', '/usr', '/etc', '/opt', '/tmp')
    if ($blocked -contains $normalized) {
        throw "Remote path is too broad for deployment: $Path"
    }

    $parts = $normalized.Split('/', [StringSplitOptions]::RemoveEmptyEntries)
    if ($parts.Count -lt 3) {
        throw "Remote path must identify a concrete site directory: $Path"
    }
}

function Assert-SafeHostValue {
    param([string]$Name, [string]$Value)

    if ($Value -notmatch '^[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?$') {
        throw "$Name contains unsupported characters: $Value"
    }
}

function Resolve-OpenSshTool {
    param([string]$Name)

    $command = Get-Command "$Name.exe" -ErrorAction SilentlyContinue
    if (-not $command) {
        $command = Get-Command $Name -ErrorAction SilentlyContinue
    }
    if ($command) {
        return $command.Source
    }

    throw "$Name was not found. Install the Windows OpenSSH client or add it to PATH."
}

function Quote-Bash {
    param([string]$Value)

    return "'" + ($Value -replace "'", "'\''") + "'"
}

function Assert-StaticOutput {
    $indexPath = Join-Path $DistDir 'index.html'
    $assetsPath = Join-Path $DistDir 'assets'

    if (-not (Test-Path -LiteralPath $indexPath -PathType Leaf)) {
        throw "Static entry was not generated: $indexPath"
    }
    if (-not (Test-Path -LiteralPath $assetsPath -PathType Container)) {
        throw "Static assets were not generated: $assetsPath"
    }
    if ((Get-ChildItem -LiteralPath $assetsPath -File -Recurse).Count -eq 0) {
        throw "Static assets directory is empty: $assetsPath"
    }
}

function Build-Site {
    if ($SkipBuild) {
        Write-Host '    Build skipped; validating existing dist' -ForegroundColor DarkGray
        Assert-StaticOutput
        return
    }

    if ($WhatIf) {
        Write-Host "    cd $ProjectDir" -ForegroundColor DarkGray
        Write-Host '    yarn (only when node_modules is missing)' -ForegroundColor DarkGray
        Write-Host '    yarn build' -ForegroundColor DarkGray
        return
    }

    Push-Location $ProjectDir
    try {
        if (-not (Test-Path -LiteralPath (Join-Path $ProjectDir 'node_modules') -PathType Container)) {
            yarn.cmd
            Assert-LastExitCode 'Dependency installation failed'
        }

        yarn.cmd build
        Assert-LastExitCode 'HostSec site build failed'
        Assert-StaticOutput
    }
    finally {
        Pop-Location
    }
}

function New-SiteArchive {
    if ($WhatIf) {
        Write-Host "    package static dist -> $ArchivePath" -ForegroundColor DarkGray
        return
    }

    $tar = Get-Command tar.exe -ErrorAction SilentlyContinue
    if (-not $tar) {
        throw 'tar.exe was not found'
    }

    & $tar.Source -czf $ArchivePath --exclude='./.openai' --exclude='./server' -C $DistDir .
    Assert-LastExitCode 'Failed to package the HostSec static site'

    if (-not (Test-Path -LiteralPath $ArchivePath -PathType Leaf) -or (Get-Item -LiteralPath $ArchivePath).Length -eq 0) {
        throw "Deployment archive is empty: $ArchivePath"
    }
}

function Get-SshOptions {
    $options = @('-i', $KeyPath, '-o', 'StrictHostKeyChecking=accept-new')
    if ($BatchMode) {
        $options += @('-o', 'BatchMode=yes')
    }
    return $options
}

function Publish-Site {
    if ($WhatIf) {
        Write-Host "    scp -i $KeyPath $ArchivePath ${Target}:$RemoteArchive" -ForegroundColor DarkGray
        Write-Host "    ssh -i $KeyPath $Target -> publish atomically to $RemotePath" -ForegroundColor DarkGray
        return
    }

    $ssh = Resolve-OpenSshTool -Name 'ssh'
    $scp = Resolve-OpenSshTool -Name 'scp'
    $sshOptions = Get-SshOptions

    & $scp @sshOptions $ArchivePath "${Target}:$RemoteArchive"
    Assert-LastExitCode 'HostSec archive upload failed'

    $releasePath = "/var/www/.hostsec-release-$ReleaseId"
    $backupPath = "/var/www/.hostsec-previous-$ReleaseId"
    $remoteScript = @'
set -euo pipefail
target=__TARGET__
release=__RELEASE__
backup=__BACKUP__
archive=__ARCHIVE__

rollback() {
  status=$?
  if [ ! -e "$target" ] && [ -e "$backup" ]; then
    mv "$backup" "$target"
  fi
  rm -rf "$release"
  rm -f "$archive"
  exit "$status"
}
trap rollback ERR

rm -rf "$release" "$backup"
install -d -m 0755 "$release"
tar -xzf "$archive" -C "$release"
test -f "$release/index.html"
test -d "$release/assets"
chown -R www-data:www-data "$release"
find "$release" -type d -exec chmod 755 {} +
find "$release" -type f -exec chmod 644 {} +

if [ -e "$target" ]; then
  mv "$target" "$backup"
fi
mv "$release" "$target"
rm -rf "$backup"
rm -f "$archive"
trap - ERR
'@
    $remoteScript = $remoteScript.Replace('__TARGET__', (Quote-Bash $RemotePath))
    $remoteScript = $remoteScript.Replace('__RELEASE__', (Quote-Bash $releasePath))
    $remoteScript = $remoteScript.Replace('__BACKUP__', (Quote-Bash $backupPath))
    $remoteScript = $remoteScript.Replace('__ARCHIVE__', (Quote-Bash $RemoteArchive))
    $remoteCommand = 'sudo bash -lc ' + (Quote-Bash $remoteScript)

    & $ssh @sshOptions $Target $remoteCommand
    Assert-LastExitCode 'Remote HostSec publish failed'
}

function Verify-Site {
    $checks = @(
        [PSCustomObject]@{ Url = 'https://hostsec.erjinyi.com/'; Resolve = "hostsec.erjinyi.com:443:$Server" },
        [PSCustomObject]@{ Url = 'https://hostsec.erjinyi.com/tenant/login'; Resolve = "hostsec.erjinyi.com:443:$Server" },
        [PSCustomObject]@{ Url = 'http://hostsec.gcsa.org/'; Resolve = "hostsec.gcsa.org:80:$Server" },
        [PSCustomObject]@{ Url = 'http://hostsec.gcsa.org/tenant/login'; Resolve = "hostsec.gcsa.org:80:$Server" }
    )

    foreach ($check in $checks) {
        Write-Host "    GET $($check.Url) -> $Server" -ForegroundColor DarkGray
        if (-not $WhatIf) {
            curl.exe --fail --silent --show-error --noproxy '*' --resolve $check.Resolve $check.Url --output NUL
            Assert-LastExitCode "Route verification failed: $($check.Url)"
        }
    }
}

if (-not (Test-Path -LiteralPath $ProjectDir -PathType Container)) {
    throw "HostSec project directory does not exist: $ProjectDir"
}
if (-not (Test-Path -LiteralPath $KeyPath -PathType Leaf)) {
    throw "PEM key does not exist: $KeyPath"
}
if ((Get-Content -LiteralPath $KeyPath -TotalCount 1) -notmatch '^-----BEGIN (?:OPENSSH |RSA |EC |DSA )?PRIVATE KEY-----$') {
    throw "The configured key is not an OpenSSH-compatible PEM private key: $KeyPath"
}
Assert-SafeHostValue -Name 'Server' -Value $Server
if ($SshUser -notmatch '^[A-Za-z_][A-Za-z0-9_-]*$') {
    throw "SSH user contains unsupported characters: $SshUser"
}
Assert-SafeRemotePath -Path $RemotePath

Write-Host '========================================' -ForegroundColor Yellow
Write-Host " HostSec site deployment -> $Target" -ForegroundColor Yellow
Write-Host " Remote path: $RemotePath" -ForegroundColor Yellow
Write-Host " Mode: $(if ($WhatIf) { 'WhatIf' } else { 'publish' })" -ForegroundColor Yellow
Write-Host '========================================' -ForegroundColor Yellow

try {
    Write-Host ''
    Write-Host '[HostSec] Build' -ForegroundColor Cyan
    Build-Site

    Write-Host '[HostSec] Package' -ForegroundColor Cyan
    New-SiteArchive

    Write-Host '[HostSec] Publish' -ForegroundColor Cyan
    Publish-Site

    if ($VerifyRoutes) {
        Write-Host '[HostSec] Verify routes' -ForegroundColor Cyan
        Verify-Site
    }
}
finally {
    if (Test-Path -LiteralPath $ArchivePath -PathType Leaf) {
        Remove-Item -LiteralPath $ArchivePath -Force
    }
}

Write-Host ''
Write-Host '========================================' -ForegroundColor Green
if ($WhatIf) {
    Write-Host ' Dry run completed; no remote changes were made' -ForegroundColor Green
}
else {
    Write-Host ' HostSec introduction site deployed successfully' -ForegroundColor Green
}
Write-Host '========================================' -ForegroundColor Green
