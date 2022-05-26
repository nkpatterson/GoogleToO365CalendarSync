using namespace System.Net

# Input bindings are passed in via param block.
param($Request, $TriggerMetadata)

$ResourceLocation = $env:AZURE_RESOURCE_LOCATION

# Interact with query parameters or the body of the request.
$username = $Request.Query.username

# Format: {username}-calsync-rg
$rgName = "$username-calsync-rg"

# Create Resource Group
New-AzureRmResourceGroup -Name $rgName -Location $ResourceLocation -Tag @{AppName="Wombat Calendar Sync"} -Force

# Associate values to output bindings by calling 'Push-OutputBinding'.
Push-OutputBinding -Name Response -Value ([HttpResponseContext]@{
    StatusCode = [HttpStatusCode]::OK
    Body = '{"rgName":"' + $rgName + '"}'
})
