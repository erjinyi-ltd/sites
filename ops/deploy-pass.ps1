#Requires -Version 5.1
<#
  Publish only the PassRecover site while preserving remote download packages.

  Examples:
    .\deploy-pass.ps1
    .\deploy-pass.ps1 -SkipBuild
    .\deploy-pass.ps1 -VerifyRoutes
    .\deploy-pass.ps1 -WhatIf
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
    -Site pass `
    -Server $Server `
    -SshUser $SshUser `
    -KeyFile $KeyFile `
    -SkipBuild:$SkipBuild `
    -VerifyRoutes:$VerifyRoutes `
    -WhatIf:$WhatIf
