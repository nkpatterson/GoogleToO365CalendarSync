enum CalendarApi {
    GoogleCalendar,
    Office365Calendar
}

class ExternalConnection {
    public ResourceId: string = "";
    public ConsentLink: string = "";

    constructor(resourceId: string, consentLink: string) {
        this.ResourceId = resourceId;
        this.ConsentLink = consentLink;
    }
}

class Api {
    apiUrlBase: string = "https://nkp-calsync-funcs.azurewebsites.net/api/";
    functionsHostKey: string = import.meta.env.FUNCTIONS_HOST_KEY;

    public getConsentCodeFromUrl(url: string): string {
        let regex = new RegExp('(code=)(.*)$');
        let result = regex.exec(url);
        if (result != null && result.length > 0) {
            return result[1];
        }

        return "";
    }

    public createResourceGroup(username: string): string {
        // returns newly created Resource Group Name
        return "";
    }

    public createExternalConnection(api: CalendarApi, username: string, resourceGroupName: string): ExternalConnection {
        // TODO: 
        return new ExternalConnection("blah", "https://godosomething.com");
    }

    public confirmConsentCode(consentCode: string, resourceId: string): boolean {
        return true;
    }

    public deployLogicApps(resourceGroupName: string, googleResourceId: string, googleCalendarId: string, office365ResourceId: string): boolean {
        return true;
    }
}

export { Api, CalendarApi, ExternalConnection }