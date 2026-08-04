#Requires -Version 5.1
<#
  Publish only the CLEANER site.

  Examples:
    .\deploy-cleaner.ps1
    .\deploy-cleaner.ps1 -SkipBuild
    .\deploy-cleaner.ps1 -WhatIf
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
    -Site cleaner `
    -Server $Server `
    -SshUser $SshUser `
    -KeyFile $KeyFile `
    -SkipBuild:$SkipBuild `
    -VerifyRoutes:$VerifyRoutes `
    -WhatIf:$WhatIf
