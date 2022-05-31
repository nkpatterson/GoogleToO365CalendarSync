using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

$subscriptionId = $env:AZURE_SUBSCRIPTION_ID
$ResourceLocation = $env:AZURE_RESOURCE_LOCATION
$AppName = $env:APP_NAME

$api = $Request.Query.api #"office365 | googlecalendar"
$username = $Request.Query.username
$ResourceGroupName = $Request.Query.rgName

# Format {username}{api}
$ConnectionName = $username + $api

Write-Host "Creating Azure Resources"
$connection = New-AzureRmResource -Properties @{"api" = @{"id" = "subscriptions/" + $subscriptionId + "/providers/Microsoft.Web/locations/" + $ResourceLocation + "/managedApis/" + $api}; "displayName" = $ConnectionName; } `
	-ResourceName $ConnectionName -ResourceType "Microsoft.Web/connections" `
	-ResourceGroupName $ResourceGroupName -Location $ResourceLocation -Tag @{AppName=$AppName} -Force

Write-Host "Connection status: " $connection.Properties.Statuses[0]

$parameters = @{
	"parameters" = ,@{
	"parameterName"= "token";
	"redirectUrl"= "https://red-forest-07202eb0f.1.azurestaticapps.net/#/consentProvided"
	}
}

Write-Host "Getting list of consent links for $connection.ResourceId"

$consentResponse = Invoke-AzureRmResourceAction -Action "listConsentLinks" -ResourceId $connection.ResourceId -Parameters $parameters -Force

$url = $consentResponse.Value.Link 
Write-Host "consent response URL: $url"

$responseBody = '{"consentLink":"' + $url + '","resourceId":"' + $connection.ResourceId + '"}'
Write-Host $responseBody

# Associate values to output bindings by calling 'Push-OutputBinding'.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $responseBody
})
