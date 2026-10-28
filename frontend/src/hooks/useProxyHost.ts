import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProxyHost, getProxyHost, getSetting, type ProxyHost, updateProxyHost } from "src/api/backend";
import {
	DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS,
	normalizeProxyHostsOptionsDefaults,
} from "src/modules/ProxyHostsOptionsDefaults";
import { DEFAULT_SSL_DEFAULTS, normalizeSslDefaults } from "src/modules/SslDefaults";

const fetchProxyHost = async (id: number | "new") => {
	if (id === "new") {
		let sslDefaults = DEFAULT_SSL_DEFAULTS;
		let proxyHostsOptionsDefaults = DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS;
		try {
			const setting = await getSetting("ssl-defaults");
			sslDefaults = normalizeSslDefaults(setting?.meta);
		} catch (_) {
			sslDefaults = DEFAULT_SSL_DEFAULTS;
		}
		try {
			const setting = await getSetting("proxy-hosts-options-defaults");
			proxyHostsOptionsDefaults = normalizeProxyHostsOptionsDefaults(setting?.meta);
		} catch (_) {
			proxyHostsOptionsDefaults = DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS;
		}

		return {
			id: 0,
			createdOn: "",
			modifiedOn: "",
			ownerUserId: 0,
			domainNames: [],
			forwardHost: "",
			forwardPort: 0,
			accessListId: 0,
			certificateId: sslDefaults.certificateId,
			sslForced: sslDefaults.sslForced,
			cachingEnabled: proxyHostsOptionsDefaults.cachingEnabled,
			blockExploits: proxyHostsOptionsDefaults.blockExploits,
			advancedConfig: "",
			meta: {},
			allowWebsocketUpgrade: proxyHostsOptionsDefaults.allowWebsocketUpgrade,
			http2Support: sslDefaults.http2Support,
			forwardScheme: "",
			enabled: true,
			hstsEnabled: sslDefaults.hstsEnabled,
			hstsSubdomains: sslDefaults.hstsSubdomains,
			trustForwardedProto: false,
		} as ProxyHost;
	}
	return getProxyHost(id, ["owner"]);
};

const useProxyHost = (id: number | "new", options = {}) => {
	return useQuery<ProxyHost, Error>({
		queryKey: ["proxy-host", id],
		queryFn: () => fetchProxyHost(id),
		staleTime: 60 * 1000, // 1 minute
		...options,
	});
};

const useSetProxyHost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (values: ProxyHost) => (values.id ? updateProxyHost(values) : createProxyHost(values)),
		onMutate: (values: ProxyHost) => {
			if (!values.id) {
				return;
			}
			const previousObject = queryClient.getQueryData(["proxy-host", values.id]);
			queryClient.setQueryData(["proxy-host", values.id], (old: ProxyHost) => ({
				...old,
				...values,
			}));
			return () => queryClient.setQueryData(["proxy-host", values.id], previousObject);
		},
		onError: (_, __, rollback: any) => rollback(),
		onSuccess: async ({ id }: ProxyHost) => {
			queryClient.invalidateQueries({ queryKey: ["proxy-host", id] });
			queryClient.invalidateQueries({ queryKey: ["proxy-hosts"] });
			queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
			queryClient.invalidateQueries({ queryKey: ["host-report"] });
			queryClient.invalidateQueries({ queryKey: ["certificates"] });
		},
	});
};

export { useProxyHost, useSetProxyHost };
