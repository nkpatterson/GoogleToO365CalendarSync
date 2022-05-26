import { describe, expect, it, vi } from "vitest"
import { Api } from "../src/services/api-service"

describe("Consent code handling", () => {
    it("should be parsed properly from a valid URL", () => {
        let svc = new Api();
        let code = "215381634fkdsafsa3956421";
        let fakeUrl = `https://ema.hosting.portal.azure.net/ema/Content?code=${code}`;

        let result = svc.getConsentCodeFromUrl(fakeUrl);
        expect(result).toBe(code);
    });

    it("should return empty string if no code found", () => {
        let svc = new Api();
        let fakeUrl = `https://ema.hosting.portal.azure.net/ema/Content?error=invalid login`;

        let result = svc.getConsentCodeFromUrl(fakeUrl);
        expect(result).toBe("");
    });
});

describe("Logged in user information", () => {
    it("should return valid user with username and id provider", async () => {
        let svc = new Api();
        let mockFetch = vi.fn().mockImplementationOnce(() => {
            return {
                json: vi.fn().mockImplementationOnce(() => {
                    return {
                        clientPrincipal: {
                            userDetails: "nkpatterson",
                            identityProvider: "github"
                        }
                    }
                })
            }
        });
        global.fetch = mockFetch;

        let result = await svc.isValidUser();
        expect(result).toBe(true);
    });

    it("should not validate user with invalid id provider", async () => {
        let svc = new Api();
        let mockFetch = vi.fn().mockImplementationOnce(() => {
            return {
                json: vi.fn().mockImplementationOnce(() => {
                    return {
                        clientPrincipal: {
                            userDetails: "nipatter",
                            identityProvider: "twitter"
                        }
                    }
                })
            }
        });
        global.fetch = mockFetch;

        let result = await svc.isValidUser();
        expect(result).toBe(false);
    });

    it("should return a valid email address", async () => {
        let api = new Api();
        let mockFetch = vi.fn().mockImplementationOnce(() => {
            return {
                json: vi.fn().mockImplementationOnce(() => {
                    return {
                        clientPrincipal: {
                            userDetails: "nkpatterson",
                            identityProvider: "github"
                        }
                    }
                })
            }
        });
        global.fetch = mockFetch;

        let result = await api.getCurrentEmailAddress();
        expect(result).toBe("nkpatterson@github.com");
    });

    it("should return just the alias", async () => {
        let svc = new Api();
        let mockFetch = vi.fn().mockImplementationOnce(() => {
            return {
                json: vi.fn().mockImplementationOnce(() => {
                    return {
                        clientPrincipal: {
                            userDetails: "nkpatterson"
                        }
                    }
                })
            }
        });
        global.fetch = mockFetch;

        let result = await svc.getCurrentAlias();
        expect(result).toBe("nkpatterson");
    });

    it("should return nothing if user not logged in", async () => {
        let svc = new Api();
        let mockFetch = vi.fn().mockImplementationOnce(() => {
            return {
                json: vi.fn().mockImplementationOnce(() => {
                    return {
                        clientPrincipal: null
                    }
                })
            }
        });
        global.fetch = mockFetch;

        let result = await svc.getCurrentUsername();
        expect(result).toBe("");
    })
})