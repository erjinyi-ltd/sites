#Requires -Version 5.1
<#
  Update CLEANER, Home Guard, HostSec, and WATERMARK with one command.

  Examples:
    .\ops\deploy-all.ps1
    .\ops\deploy-all.ps1 -WhatIf
    .\ops\deploy-all.ps1 -SkipBuild
#>
param(
    [string]$StaticServer = '34.96.169.250',
    [string]$StaticSshUser = 'ubuntu',
    [string]$StaticKeyFile = '34.96.169.250.pem',
    [string]$HostSecServer = '35.221.234.42',
    [string]$HostSecSshUser = 'ubuntu',
    [string]$HostSecKeyFile = 'hostsec\35.221.234.42.pem',
    [string]$HostSecRemotePath = '/var/www/hostsec',
    [switch]$SkipBuild,
    [switch]$VerifyRoutes,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'
$OpsDir = $PSScriptRoot

function Invoke-SiteDeployment {
    param(
        [string]$Name,
        [string]$Script,
        [hashtable]$Arguments
    )

    $scriptPath = Join-Path $OpsDir $Script
    if (-not (Test-Path -LiteralPath $scriptPath -PathType Leaf)) {
        throw "Deployment script not found: $scriptPath"
    }

    Write-Host ''
    Write-Host "=== $Name ===" -ForegroundColor Cyan
    & $scriptPath @Arguments
    if (-not $?) {
        throw "$Name deployment failed."
    }
}

$sharedArguments = @{
    Server = $StaticServer
    SshUser = $StaticSshUser
    KeyFile = $StaticKeyFile
    SkipBuild = $SkipBuild
    VerifyRoutes = $VerifyRoutes
    WhatIf = $WhatIf
}

$deployments = @(
    @{
        Name = 'CLEANER'
        Script = 'deploy-cleaner.ps1'
        Arguments = $sharedArguments
    },
    @{
        Name = 'Home Guard'
        Script = 'deploy-homeguard.ps1'
        Arguments = $sharedArguments
    },
    @{
        Name = 'HostSec'
        Script = 'deploy-hostsec.ps1'
        Arguments = @{
            Server = $HostSecServer
            SshUser = $HostSecSshUser
            KeyFile = $HostSecKeyFile
            RemotePath = $HostSecRemotePath
            BatchMode = $true
            SkipBuild = $SkipBuild
            VerifyRoutes = $VerifyRoutes
            WhatIf = $WhatIf
        }
    },
    @{
        Name = 'WATERMARK'
        Script = 'deploy-watermark.ps1'
        Arguments = $sharedArguments
    }
)

foreach ($deployment in $deployments) {
    Invoke-SiteDeployment @deployment
}

Write-Host ''
if ($WhatIf) {
    Write-Host 'All four deployment plans completed successfully.' -ForegroundColor Green
}
else {
    Write-Host 'All four sites were updated successfully.' -ForegroundColor Green
}
