export interface SslDefaults {
	certificateId: number;
	sslForced: boolean;
	http2Support: boolean;
	hstsEnabled: boolean;
	hstsSubdomains: boolean;
}

export const DEFAULT_SSL_DEFAULTS: SslDefaults = {
	certificateId: 0,
	sslForced: false,
	http2Support: false,
	hstsEnabled: false,
	hstsSubdomains: false,
};

export function normalizeSslDefaults(meta: any): SslDefaults {
	const defaults: SslDefaults = {
		certificateId: Number(meta?.certificateId) || 0,
		sslForced: !!meta?.sslForced,
		http2Support: !!meta?.http2Support,
		hstsEnabled: !!meta?.hstsEnabled,
		hstsSubdomains: !!meta?.hstsSubdomains,
	};

	if (!defaults.certificateId) {
		defaults.sslForced = false;
		defaults.http2Support = false;
	}

	if (!defaults.sslForced) {
		defaults.hstsEnabled = false;
	}

	if (!defaults.hstsEnabled) {
		defaults.hstsSubdomains = false;
	}

	return defaults;
}
