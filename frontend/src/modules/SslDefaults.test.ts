import { describe, expect, it } from "vitest";
import { normalizeSslDefaults } from "./SslDefaults";

describe("normalizeSslDefaults", () => {
	it("disables dependent SSL options when there is no certificate", () => {
		const result = normalizeSslDefaults({
			certificateId: 0,
			sslForced: true,
			http2Support: true,
			hstsEnabled: true,
			hstsSubdomains: true,
		});

		expect(result).toEqual({
			certificateId: 0,
			sslForced: false,
			http2Support: false,
			hstsEnabled: false,
			hstsSubdomains: false,
		});
	});

	it("disables hsts subdomains when hsts is disabled", () => {
		const result = normalizeSslDefaults({
			certificateId: 123,
			sslForced: true,
			hstsEnabled: false,
			hstsSubdomains: true,
		});

		expect(result.hstsSubdomains).toBe(false);
	});
});
