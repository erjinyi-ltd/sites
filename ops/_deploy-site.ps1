#Requires -Version 5.1
<#
  Internal single-site deployment engine.

  Use a site-specific deploy script instead of invoking this file directly.
#>
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('watermark', 'cleaner', 'homeguard', 'pass', 'hostsec')]
    [string]$Site,

    [ValidateNotNullOrEmpty()]
    [string]$Server = '34.96.169.250',

    [ValidateNotNullOrEmpty()]
    [string]$SshUser = 'ubuntu',

    [ValidateNotNullOrEmpty()]
    [string]$KeyFile = '34.96.169.250.pem',

    [string]$RemotePath = '',

    [switch]$SkipBuild,
    [switch]$VerifyRoutes,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'

$OpsDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$RepoDir = Split-Path -Parent $OpsDir
$KeyPath = if ([IO.Path]::IsPathRooted($KeyFile)) { $KeyFile } else { Join-Path $OpsDir $KeyFile }
$Target = "${SshUser}@${Server}"
$SshOpts = @('-i', $KeyPath, '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=accept-new')

$SiteDefinitions = @(
    [PSCustomObject]@{
        Key = 'watermark'
        Name = 'WATERMARK'
        ProjectDir = Join-Path $RepoDir 'watermarkinspector'
        RemotePath = '/var/www/watermarkinspector'
        PrimaryDomain = 'watermarkinspector.erjinyi.com'
        OriginDomain = 'watermarkinspector.gcsa.org'
        Routes = @('/', '/privacy', '/terms', '/support')
        PreserveItems = @()
    },
    [PSCustomObject]@{
        Key = 'cleaner'
        Name = 'CLEANER'
        ProjectDir = Join-Path $RepoDir 'cleaner'
        RemotePath = '/var/www/cleaner'
        PrimaryDomain = 'cleaner.erjinyi.com'
        OriginDomain = 'cleaner.gcsa.org'
        Routes = @('/')
        PreserveItems = @()
    },
    [PSCustomObject]@{
        Key = 'homeguard'
        Name = 'HOME GUARD'
        ProjectDir = Join-Path $RepoDir 'homeguard'
        RemotePath = '/var/www/homeguard'
        PrimaryDomain = 'homeguard.erjinyi.com'
        OriginDomain = 'homeguard.gcsa.org'
        Routes = @('/', '/privacy', '/terms', '/support')
        PreserveItems = @()
    },
    [PSCustomObject]@{
        Key = 'pass'
        Name = 'PASSRECOVER'
        ProjectDir = Join-Path $RepoDir 'pass'
        RemotePath = '/var/www/pass'
        PrimaryDomain = 'pass.erjinyi.com'
        OriginDomain = 'passrecover.gcsa.org'
        Routes = @('/', '/privacy', '/terms', '/support')
        PreserveItems = @('downloads')
    },
    [PSCustomObject]@{
        Key = 'hostsec'
        Name = 'HOSTSEC'
        ProjectDir = Join-Path $RepoDir 'hostsec'
        RemotePath = '/var/www/hostsec'
        PrimaryDomain = 'hostsec.erjinyi.com'
        OriginDomain = 'hostsec.gcsa.org'
        Routes = @('/', '/tenant/login')
        PreserveItems = @()
    }
)

$SiteDefinitions = @($SiteDefinitions | Where-Object { $_.Key -eq $Site })
if ($RemotePath) {
    $SiteDefinitions[0].RemotePath = $RemotePath
}

function Assert-LastExitCode {
    param([string]$Message)

    if ($LASTEXITCODE -ne 0) {
        throw $Message
    }
}

function Quote-Remote {
    param([string]$Value)

    return "'" + ($Value -replace "'", "'\''") + "'"
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
        throw "Remote path is too broad for a clean deployment: $Path"
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

function Assert-SafeChildName {
    param([string]$Name)

    if ($Name -notmatch '^[A-Za-z0-9][A-Za-z0-9._-]*$' -or $Name -in @('.', '..')) {
        throw "Preserved item contains unsupported characters: $Name"
    }
}

function Invoke-Remote {
    param([string]$Command)

    $remoteCommand = 'sudo bash -lc ' + (Quote-Remote $Command)
    Write-Host "    ssh $remoteCommand" -ForegroundColor DarkGray
    if ($WhatIf) {
        return
    }

    ssh @SshOpts $Target $remoteCommand
    Assert-LastExitCode 'Remote command failed'
}

function Get-StaticItems {
    param([string]$DistDir)

    return @(Get-ChildItem -LiteralPath $DistDir -Force | Where-Object {
        $_.Name -notin @('.openai', 'server')
    })
}

function Assert-StaticOutput {
    param([string]$DistDir, [Nullable[datetime]]$BuiltAfter)

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
    if ((Get-StaticItems -DistDir $DistDir).Count -eq 0) {
        throw "Static output is empty: $DistDir"
    }

    if ($BuiltAfter.HasValue) {
        $indexFile = Get-Item -LiteralPath $indexPath
        if ($indexFile.LastWriteTime -lt $BuiltAfter.Value.AddSeconds(-2)) {
            throw "Static output is older than the current build: $indexPath"
        }
    }
}

function Build-Site {
    param($Definition)

    $packagePath = Join-Path $Definition.ProjectDir 'package.json'
    if (-not (Test-Path -LiteralPath $packagePath -PathType Leaf)) {
        throw "Project package.json does not exist: $packagePath"
    }

    $distDir = Join-Path $Definition.ProjectDir 'dist'
    if ($SkipBuild) {
        Write-Host '    Build skipped; validating existing dist' -ForegroundColor DarkGray
        Assert-StaticOutput -DistDir $distDir
        return
    }

    if ($WhatIf) {
        Write-Host "    cd $($Definition.ProjectDir)" -ForegroundColor DarkGray
        Write-Host '    yarn (only when node_modules is missing)' -ForegroundColor DarkGray
        Write-Host '    yarn build' -ForegroundColor DarkGray
        return
    }

    Push-Location $Definition.ProjectDir
    try {
        if (-not (Test-Path -LiteralPath (Join-Path $Definition.ProjectDir 'node_modules') -PathType Container)) {
            Write-Host '    yarn' -ForegroundColor DarkGray
            yarn.cmd
            Assert-LastExitCode "Dependency installation failed: $($Definition.Name)"
        }

        $buildStartedAt = Get-Date
        Write-Host '    yarn build' -ForegroundColor DarkGray
        yarn.cmd build
        Assert-LastExitCode "Build failed: $($Definition.Name)"
        Assert-StaticOutput -DistDir $distDir -BuiltAfter $buildStartedAt
    }
    finally {
        Pop-Location
    }
}

function Publish-Site {
    param($Definition, [string]$DistDir)

    $remoteDir = $Definition.RemotePath.TrimEnd('/')
    Assert-SafeRemotePath $remoteDir
    Assert-SafeHostValue 'Primary domain' $Definition.PrimaryDomain
    Assert-SafeHostValue 'Origin domain' $Definition.OriginDomain

    $preserveFilters = @()
    foreach ($itemName in $Definition.PreserveItems) {
        Assert-SafeChildName $itemName
        $preserveFilters += "! -name $(Quote-Remote $itemName)"
    }

    Write-Host ''
    Write-Host "[$($Definition.Name)] Clear remote directory" -ForegroundColor Cyan
    $quotedRemoteDir = Quote-Remote $remoteDir
    $cleanupFilters = if ($preserveFilters.Count -gt 0) { ' ' + ($preserveFilters -join ' ') } else { '' }
    Invoke-Remote "mkdir -p $quotedRemoteDir && find $quotedRemoteDir -mindepth 1 -maxdepth 1$cleanupFilters -exec rm -rf {} +"
    Invoke-Remote "chown -R $($SshUser):$($SshUser) $quotedRemoteDir"

    Write-Host "[$($Definition.Name)] Upload static files" -ForegroundColor Cyan
    $remoteTarget = "${Target}:${remoteDir}/"
    if ($WhatIf) {
        Write-Host "    scp dist client files -> $remoteTarget" -ForegroundColor DarkGray
    }
    else {
        foreach ($item in (Get-StaticItems -DistDir $DistDir)) {
            scp @SshOpts -r $item.FullName $remoteTarget
            Assert-LastExitCode "Upload failed: $($item.FullName)"
        }
    }

    $permissionCommand = "find $quotedRemoteDir -type d -exec chmod 755 {} + && find $quotedRemoteDir -type f -exec chmod 644 {} +"
    Invoke-Remote "chown -R www-data:www-data $quotedRemoteDir && $permissionCommand"

    if (-not $VerifyRoutes) {
        return
    }

    Write-Host "[$($Definition.Name)] Verify routes" -ForegroundColor Cyan
    foreach ($route in $Definition.Routes) {
        $primaryUrl = "https://$($Definition.PrimaryDomain)$route"
        $originUrl = "http://$($Definition.OriginDomain)$route"
        Write-Host "    GET $primaryUrl -> $Server" -ForegroundColor DarkGray
        Write-Host "    GET $originUrl -> $Server" -ForegroundColor DarkGray

        if (-not $WhatIf) {
            curl.exe --fail --silent --show-error --noproxy '*' --resolve "$($Definition.PrimaryDomain):443:${Server}" $primaryUrl --output NUL
            Assert-LastExitCode "HTTPS verification failed: $primaryUrl"
            curl.exe --fail --silent --show-error --noproxy '*' --resolve "$($Definition.OriginDomain):80:${Server}" $originUrl --output NUL
            Assert-LastExitCode "Origin verification failed: $originUrl"
        }
    }
}

if (-not (Test-Path -LiteralPath $KeyPath -PathType Leaf)) {
    throw "SSH key does not exist: $KeyPath"
}
Assert-SafeHostValue 'Server' $Server
if ($SshUser -notmatch '^[A-Za-z_][A-Za-z0-9_-]*$') {
    throw "SSH user contains unsupported characters: $SshUser"
}

Write-Host '========================================' -ForegroundColor Yellow
Write-Host " Static site deployment -> $Target" -ForegroundColor Yellow
Write-Host " Site:  $($SiteDefinitions.Name)" -ForegroundColor Yellow
Write-Host " Mode:  $(if ($WhatIf) { 'WhatIf' } else { 'publish' })" -ForegroundColor Yellow
Write-Host '========================================' -ForegroundColor Yellow

foreach ($definition in $SiteDefinitions) {
    Write-Host ''
    Write-Host "[$($definition.Name)] Build" -ForegroundColor Cyan
    $distDir = Join-Path $definition.ProjectDir 'dist'
    Build-Site -Definition $definition
    Publish-Site -Definition $definition -DistDir $distDir
}

Write-Host ''
Write-Host '========================================' -ForegroundColor Green
if ($WhatIf) {
    Write-Host ' Dry run completed; no remote changes were made' -ForegroundColor Green
}
else {
    Write-Host ' Site deployed successfully' -ForegroundColor Green
}
Write-Host '========================================' -ForegroundColor Green
