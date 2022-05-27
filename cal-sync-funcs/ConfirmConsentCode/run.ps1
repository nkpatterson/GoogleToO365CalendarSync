using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

$code = $Request.Query.consentCode
$resourceId = $Request.Query.resourceId

if (-Not [string]::IsNullOrEmpty($code)) {
	$parameters = @{ }
    $parameters.Add("code", $code)
    
    Write-Host "Confirming consent code $code for $resourceId..."
	Invoke-AzureRmResourceAction -Action "confirmConsentCode" -ResourceId $resourceId -Parameters $parameters -Force -ErrorAction Ignore
} else {
    Write-Host "Consent code not provided"

    Push-OutputBinding -Name Response - Value ([HttpResponseContext]@{
        StatusCode = [HttpStatusCode]::UnprocessableEntity
        Body = "Missing consent code"
    })
}

Write-Host "Getting updated connection..."
$connection = Get-AzureRmResource -ResourceId $resourceId
$status = $connection.Properties.Statuses[0]
Write-Host "Status: $status"

$responseBody = '{"resourceId":"' + $resourceId + '","status":"' + $status + '"}'

# Associate values to output bindings by calling 'Push-OutputBinding'.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = $responseBody
})

