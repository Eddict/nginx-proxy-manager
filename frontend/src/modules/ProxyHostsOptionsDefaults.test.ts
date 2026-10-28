import { describe, expect, it } from "vitest";
import {
	DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS,
	normalizeProxyHostsOptionsDefaults,
} from "./ProxyHostsOptionsDefaults";

describe("normalizeProxyHostsOptionsDefaults", () => {
	it("uses explicit boolean values from meta", () => {
		const result = normalizeProxyHostsOptionsDefaults({
			cachingEnabled: true,
			blockExploits: false,
			allowWebsocketUpgrade: false,
		});

		expect(result).toEqual({
			cachingEnabled: true,
			blockExploits: false,
			allowWebsocketUpgrade: false,
		});
	});

	it("falls back to defaults when values are missing or invalid", () => {
		const result = normalizeProxyHostsOptionsDefaults({
			cachingEnabled: "true",
			blockExploits: 1,
		});

		expect(result).toEqual(DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS);
	});
});
