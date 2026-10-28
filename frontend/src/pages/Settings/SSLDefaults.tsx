import { Form, Formik } from "formik";
import { type ReactNode, useState } from "react";
import { Alert } from "react-bootstrap";
import { Button, Loading, SSLCertificateField, SSLOptionsFields } from "src/components";
import { useSetSetting, useSetting } from "src/hooks";
import { T } from "src/locale";
import { DEFAULT_SSL_DEFAULTS, normalizeSslDefaults } from "src/modules/SslDefaults";
import { showObjectSuccess } from "src/notifications";

export default function SSLDefaults() {
	const { data, isLoading, error } = useSetting("ssl-defaults");
	const { mutate: setSetting } = useSetSetting();
	const [errorMsg, setErrorMsg] = useState<ReactNode | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (values: any, { setSubmitting }: any) => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		setErrorMsg(null);

		setSetting(
			{
				id: "ssl-defaults",
				value: "defaults",
				meta: {
					certificateId: values.certificateId,
					sslForced: values.sslForced,
					http2Support: values.http2Support,
					hstsEnabled: values.hstsEnabled,
					hstsSubdomains: values.hstsSubdomains,
				},
			},
			{
				onError: (err: any) => setErrorMsg(<T id={err.message} />),
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
				...DEFAULT_SSL_DEFAULTS,
				...normalizeSslDefaults(data?.meta),
			}}
			onSubmit={onSubmit}
		>
			{() => (
				<Form>
					<div className="card-body">
						<Alert variant="danger" show={!!errorMsg} onClose={() => setErrorMsg(null)} dismissible>
							{errorMsg}
						</Alert>
						<SSLCertificateField />
						<SSLOptionsFields color="bg-teal" />
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
