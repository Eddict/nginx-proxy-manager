import { useState } from "react";
import { T } from "src/locale";
import DefaultSite from "./DefaultSite";
import ProxyHostsOptionsDefaults from "./ProxyHostsOptionsDefaults";
import SSLDefaults from "./SSLDefaults";

export default function Layout() {
	// Taken from https://preview.tabler.io/settings.html
	// Refer to that when updating this content
	const [activeTab, setActiveTab] = useState<"default-site" | "ssl-defaults" | "proxy-hosts-options-defaults">(
		"default-site",
	);

	return (
		<div className="card mt-4">
			<div className="card-status-top bg-teal" />
			<div className="card-table">
				<div className="card-header">
					<div className="row w-full">
						<h2 className="mt-1 mb-0">
							<T id="settings" />
						</h2>
					</div>
				</div>
				<div className="row g-0">
					<div className="col-12 col-md-3 border-end">
						<div className="card-body mt-0 pt-0">
							<div className="list-group list-group-transparent">
								<a
									href="#"
									className={`list-group-item list-group-item-action d-flex align-items-center${activeTab === "default-site" ? " active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("default-site");
									}}
								>
									<T id="settings.default-site" />
								</a>
								<a
									href="#"
									className={`list-group-item list-group-item-action d-flex align-items-center${activeTab === "ssl-defaults" ? " active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("ssl-defaults");
									}}
								>
									<T id="settings.ssl-defaults" />
								</a>
								<a
									href="#"
									className={`list-group-item list-group-item-action d-flex align-items-center${activeTab === "proxy-hosts-options-defaults" ? " active" : ""}`}
									onClick={(e) => {
										e.preventDefault();
										setActiveTab("proxy-hosts-options-defaults");
									}}
								>
									<T id="settings.proxy-hosts-options-defaults" />
								</a>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-9 d-flex flex-column">
						{activeTab === "default-site" && <DefaultSite />}
						{activeTab === "ssl-defaults" && <SSLDefaults />}
						{activeTab === "proxy-hosts-options-defaults" && <ProxyHostsOptionsDefaults />}
					</div>
				</div>
			</div>
		</div>
	);
}
