export interface ProxyHostsOptionsDefaults {
	cachingEnabled: boolean;
	blockExploits: boolean;
	allowWebsocketUpgrade: boolean;
}

export const DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS: ProxyHostsOptionsDefaults = {
	cachingEnabled: false,
	blockExploits: true,
	allowWebsocketUpgrade: true,
};

export function normalizeProxyHostsOptionsDefaults(meta: any): ProxyHostsOptionsDefaults {
	return {
		cachingEnabled: typeof meta?.cachingEnabled === "boolean" ? meta.cachingEnabled : false,
		blockExploits: typeof meta?.blockExploits === "boolean" ? meta.blockExploits : true,
		allowWebsocketUpgrade: typeof meta?.allowWebsocketUpgrade === "boolean" ? meta.allowWebsocketUpgrade : true,
	};
}
