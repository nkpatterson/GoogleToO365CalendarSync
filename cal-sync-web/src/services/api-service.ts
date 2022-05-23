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
    // apiUrlBase: string = import.meta.env.VITE_FUNCTIONS_HOST_URL + "/api/";
    apiUrlBase: string = "/api/";
    functionsHostKey: string = import.meta.env.VITE_FUNCTIONS_HOST_KEY;

    public getConsentCodeFromUrl(url: string): string {
        let regex = new RegExp('(code=)(.*)$');
        let result = regex.exec(url);
        if (result != null && result.length > 0) {
            return result[2];
        }

        return "";
    }

    public async getCurrentUsername():Promise<string> {
        let response = await fetch('/.auth/me');
        let payload = await response.json();
        
        if (payload.clientPrincipal != null)
            return payload.clientPrincipal.userDetails;

        return "";
    }

    public async getCurrentAlias(): Promise<string> {
        let username = await this.getCurrentUsername();
        if (username != "" && username.indexOf("@") > 0) {
            return username.split("@")[0];
        }

        return "";
    }

    public async isValidUser(): Promise<boolean> {
        let username = await this.getCurrentUsername();
        return username.endsWith("@microsoft.com");
    }

    public async createResourceGroup(username: string): Promise<string> {
        let response = await fetch(this.apiUrlBase + "CreateResourceGroup?username=" + username);
        let payload = await response.json();

        return payload.rgName;
    }

    public async createExternalConnection(api: CalendarApi, username: string, resourceGroupName: string): Promise<ExternalConnection> {
        let apiString = (api == CalendarApi.GoogleCalendar) ? "googlecalendar" : "office365";
        let response = await fetch(this.apiUrlBase + "CreateExternalConnection?api=" + apiString + "&username=" + username + "&rgName=" + resourceGroupName);
        let payload = await response.json();

        return new ExternalConnection(payload.resourceId, payload.consentLink);
    }

    public async confirmConsentCode(consentCode: string, resourceId: string): Promise<boolean> {
        let response = await fetch(this.apiUrlBase + "ConfirmConsentCode?consentCode=" + consentCode + "&resourceId=" + resourceId);
        let payload = await response.json();

        return payload.status;
    }

    public async deployLogicApps(resourceGroupName: string, googleResourceId: string, googleCalendarId: string, office365ResourceId: string): Promise<boolean> {
        let url = this.apiUrlBase + "DeployLogicApp?rgName=" + resourceGroupName + "&googleResourceId=" + googleResourceId + "&office365ResourceId=" + office365ResourceId + "&googleCalendarId=" + googleCalendarId;
        let response = await fetch(url);
        let payload = await response.text();

        return (payload == "Success") ? true : false;
    }
}

export { Api, CalendarApi, ExternalConnection }