#Requires -Version 5.1
<#
  Publish only the HostSec introduction site.

  Examples:
    .\deploy-hostsec.ps1
    .\deploy-hostsec.ps1 -SkipBuild
    .\deploy-hostsec.ps1 -VerifyRoutes
    .\deploy-hostsec.ps1 -WhatIf
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
$deployScript = Join-Path $PSScriptRoot '_deploy-site.ps1'

& $deployScript `
    -Site hostsec `
    -Server $Server `
    -SshUser $SshUser `
    -KeyFile $KeyFile `
    -RemotePath $RemotePath `
    -SkipBuild:$SkipBuild `
    -VerifyRoutes:$VerifyRoutes `
    -WhatIf:$WhatIf
