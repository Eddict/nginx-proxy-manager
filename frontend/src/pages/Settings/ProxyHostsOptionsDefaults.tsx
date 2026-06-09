import cn from "classnames";
import { Field, Form, Formik, type FieldProps, type FormikHelpers } from "formik";
import { type ReactNode, useState } from "react";
import { Alert } from "react-bootstrap";
import { Button, Loading } from "src/components";
import { useSetSetting, useSetting } from "src/hooks";
import { T } from "src/locale";
import {
	DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS,
	normalizeProxyHostsOptionsDefaults,
} from "src/modules/ProxyHostsOptionsDefaults";
import { showObjectSuccess } from "src/notifications";

type FormValues = typeof DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS;

export default function ProxyHostsOptionsDefaults() {
	const { data, isLoading, error } = useSetting("proxy-hosts-options-defaults");
	const { mutate: setSetting } = useSetSetting();
	const [errorMsg, setErrorMsg] = useState<ReactNode | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		setErrorMsg(null);

		setSetting(
			{
				id: "proxy-hosts-options-defaults",
				value: "defaults",
				meta: {
					cachingEnabled: values.cachingEnabled,
					blockExploits: values.blockExploits,
					allowWebsocketUpgrade: values.allowWebsocketUpgrade,
				},
			},
			{
				onError: (err: Error) => setErrorMsg(<T id={err.message} />),
				onSuccess: () => {
					showObjectSuccess("setting", "saved");
				},
				onSettled: () => {
					setIsSubmitting(false);
					setSubmitting(false);
				},
			},
		);
	};

	if (!isLoading && error) {
		return (
			<div className="card-body">
				<div className="mb-3">
					<Alert variant="danger" show>
						{error.message}
					</Alert>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="card-body">
				<div className="mb-3">
					<Loading noLogo />
				</div>
			</div>
		);
	}

	return (
		<Formik
			initialValues={{
				...DEFAULT_PROXY_HOSTS_OPTIONS_DEFAULTS,
				...normalizeProxyHostsOptionsDefaults(data?.meta),
			}}
			onSubmit={onSubmit}
		>
			{() => (
				<Form>
					<div className="card-body">
						<Alert variant="danger" show={!!errorMsg} onClose={() => setErrorMsg(null)} dismissible>
							{errorMsg}
						</Alert>
						<h4 className="py-2">
							<T id="options" />
						</h4>
						<div className="divide-y">
							<div>
								<label className="row" htmlFor="cachingEnabled">
									<span className="col">
										<T id="host.flags.cache-assets" />
									</span>
									<span className="col-auto">
										<Field name="cachingEnabled" type="checkbox">
											{({ field }: FieldProps<boolean>) => {
												const { value: _value, ...restField } = field;
												return (
													<label className="form-check form-check-single form-switch">
														<input
															{...restField}
															id="cachingEnabled"
															className={cn("form-check-input", {
																"bg-teal": field.checked,
															})}
															type="checkbox"
														/>
													</label>
												);
											}}
										</Field>
									</span>
								</label>
							</div>
							<div>
								<label className="row" htmlFor="blockExploits">
									<span className="col">
										<T id="host.flags.block-exploits" />
									</span>
									<span className="col-auto">
										<Field name="blockExploits" type="checkbox">
											{({ field }: FieldProps<boolean>) => {
												const { value: _value, ...restField } = field;
												return (
													<label className="form-check form-check-single form-switch">
														<input
															{...restField}
															id="blockExploits"
															className={cn("form-check-input", {
																"bg-teal": field.checked,
															})}
															type="checkbox"
														/>
													</label>
												);
											}}
										</Field>
									</span>
								</label>
							</div>
							<div>
								<label className="row" htmlFor="allowWebsocketUpgrade">
									<span className="col">
										<T id="host.flags.websockets-upgrade" />
									</span>
									<span className="col-auto">
										<Field name="allowWebsocketUpgrade" type="checkbox">
											{({ field }: FieldProps<boolean>) => {
												const { value: _value, ...restField } = field;
												return (
													<label className="form-check form-check-single form-switch">
														<input
															{...restField}
															id="allowWebsocketUpgrade"
															className={cn("form-check-input", {
																"bg-teal": field.checked,
															})}
															type="checkbox"
														/>
													</label>
												);
											}}
										</Field>
									</span>
								</label>
							</div>
						</div>
					</div>
					<div className="card-footer bg-transparent mt-auto">
						<div className="btn-list justify-content-end">
							<Button
								type="submit"
								actionType="primary"
								className="ms-auto bg-teal"
								isLoading={isSubmitting}
								disabled={isSubmitting}
							>
								<T id="save" />
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
