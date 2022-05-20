import { describe, expect, it } from "vitest"
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
    })
});