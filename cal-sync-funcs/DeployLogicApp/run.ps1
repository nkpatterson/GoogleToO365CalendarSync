using namespace System.Net

param($Request, $TriggerMetadata)

$templateUri = $env:GOOGLE_TO_O365_CREATE_TEMPLATE_URI
$AppName = $env:APP_NAME

$rgName = $Request.Query.rgName
$googleResourceId = $Request.Query.googleResourceId
$googleCalendarId = $Request.Query.googleCalendarId
$office365ResourceId = $Request.Query.office365ResourceId

New-AzResourceGroupDeployment -Name "DeployGoogleToO365CalSync" -ResourceGroupName $rgName `
    -TemplateUri $templateUri -Force -Tag @{AppName=$AppName} `
    -googleCalendarExternalId $googleResourceId `
    -office365ExternalId $office365ResourceId `
    -googleCalendarId $googleCalendarId `

Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = "Success"
})
