#Requires -Version 5.1
<#
  Publish only the HOME GUARD site.

  Examples:
    .\deploy-homeguard.ps1
    .\deploy-homeguard.ps1 -SkipBuild
    .\deploy-homeguard.ps1 -WhatIf
#>
param(
    [ValidateNotNullOrEmpty()]
    [string]$Server = '34.96.169.250',

    [ValidateNotNullOrEmpty()]
    [string]$SshUser = 'ubuntu',

    [ValidateNotNullOrEmpty()]
    [string]$KeyFile = '34.96.169.250.pem',

    [switch]$SkipBuild,
    [switch]$VerifyRoutes,
    [switch]$WhatIf
)

$ErrorActionPreference = 'Stop'
$deployScript = Join-Path $PSScriptRoot '_deploy-site.ps1'

& $deployScript `
    -Site homeguard `
    -Server $Server `
    -SshUser $SshUser `
    -KeyFile $KeyFile `
    -SkipBuild:$SkipBuild `
    -VerifyRoutes:$VerifyRoutes `
    -WhatIf:$WhatIf
