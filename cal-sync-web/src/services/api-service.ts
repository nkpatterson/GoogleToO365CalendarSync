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

class ClientPrincipal {
    public IdentityProvider: string = "";
    public UserId: string = "";
    public UserDetails: string = "";
    public UserRoles: Array<string> = [];
    public IsInitialized: boolean = false;
    public Initialize(identifyProvider: string, userId: string, userDetails: string) {
        this.IdentityProvider = identifyProvider;
        this.UserId = userId;
        this.UserDetails = userDetails;
        this.IsInitialized = true;
    }
}

class Api {
    apiUrlBase: string = "/api/";
    functionsHostKey: string = import.meta.env.VITE_FUNCTIONS_HOST_KEY;
    clientPrincipal: ClientPrincipal = new ClientPrincipal();

    public getConsentCodeFromUrl(url: string): string {
        let regex = new RegExp('(code=)(.*)$');
        let result = regex.exec(url);
        if (result != null && result.length > 0) {
            return result[2];
        }

        return "";
    }

    public async getClientPrincipal(): Promise<ClientPrincipal> {
        if (this.clientPrincipal.IsInitialized)
            return this.clientPrincipal;

        let response = await fetch('/.auth/me');
        let payload = await response.json();

        if (payload.clientPrincipal != null) {
            this.clientPrincipal.Initialize(payload.clientPrincipal.identityProvider, 
                payload.clientPrincipal.userId, payload.clientPrincipal.userDetails);
        }

        return this.clientPrincipal;
    }

    public async getCurrentUsername():Promise<string> {
        return (await this.getClientPrincipal()).UserDetails;
    }

    public async getCurrentEmailAddress(): Promise<string> {
        let client = await this.getClientPrincipal();
        return `${client.UserDetails}@${client.IdentityProvider}.com`;
    }    

    public async getCurrentAlias(): Promise<string> {
        let username = await this.getCurrentUsername();
        if (username != "" && username.indexOf("@") > 0) {
            return username.split("@")[0];
        }

        return username;
    }

    public async isValidUser(): Promise<boolean> {
        let clientPrincipal = await this.getClientPrincipal();
        return clientPrincipal.IdentityProvider == "github" && clientPrincipal.UserDetails != "";
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

export { Api, CalendarApi, ExternalConnection, ClientPrincipal }