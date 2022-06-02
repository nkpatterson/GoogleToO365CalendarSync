using namespace System.Net

param($Request, $TriggerMetadata)

$ResourceLocation = $env:AZURE_RESOURCE_LOCATION
$AppName = $env:APP_NAME

$username = $Request.Query.username
$rgName = "$username-calsync-rg"

New-AzureRmResourceGroup -Name $rgName -Location $ResourceLocation -Tag @{AppName=$AppName} -Force

Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = '{"rgName":"' + $rgName + '"}'
})
