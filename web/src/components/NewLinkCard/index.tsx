import { Form, Input } from "antd";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useCreateLinkMutation } from "@/features/mutations/create-link";
import * as S from "./styles";

interface NewLinkCardProp {
	isExporting: boolean;
}

export const NewLinkCard = ({ isExporting }: NewLinkCardProp) => {
	const [form] = Form.useForm();

	const createLinkMutation = useCreateLinkMutation();

	const handleSubmit = (values: {
		originalLink: string;
		shortener: string;
	}) => {
		const userInputUrl = values.originalLink;
		let formattedUrl = userInputUrl;

		if (!/^(http|https):\/\//.test(userInputUrl)) {
			formattedUrl = `https://${userInputUrl}`;
		}

		const payload = {
			url: formattedUrl,
			shortener: values.shortener,
		};

		try {
			const promise = createLinkMutation.mutateAsync(payload);

			toast.promise(promise, {
				loading: "Gerando link...",
				error: (error: Error) => {
					if (isAxiosError(error)) {
						const statusCode = error.response?.status;
						if (statusCode === 409) return "Encurtador informado já existe.";
						if (statusCode === 400)
							return "Dados inválidos. Verifique a URL e o encurtador.";
						return "Ocorreu um erro  inesperado. Tente novamente mais tarde.";
					}
				},
			});
			form.resetFields();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<S.CardContainer>
			<S.CardTitle>Novo Link</S.CardTitle>
			<Form
				form={form}
				layout="vertical"
				requiredMark={false}
				onFinish={handleSubmit}
				disabled={createLinkMutation.isPending}
			>
				<Form.Item
					label="LINK ORIGINAL"
					name="originalLink"
					rules={[{ required: true, message: "Informe uma url válida." }]}
				>
					<Input placeholder="www.exemplo.com.br" />
				</Form.Item>

				<Form.Item
					label="LINK ENCURTADO"
					name="shortener"
					rules={[
						{
							required: true,
							message:
								"Informe uma url minúscula e sem espaço/caracter especial.",
						},
						{
							min: 3,
							message: "O encurtador deve ter no mínimo 3 caracteres.",
						},
						{
							pattern: /^[a-z0-9_-]+$/,
							message: "Use apenas letras minúsculas, números, - ou _",
						},
					]}
				>
					<S.ShortenerInput prefix="brev.ly/" />
				</Form.Item>

				<Form.Item shouldUpdate>
					{() => {
						const originalLinkValue = form.getFieldValue("originalLink");
						const shortenerValue = form.getFieldValue("shortener");

						const isDisabled =
							!originalLinkValue ||
							!shortenerValue ||
							createLinkMutation.isPending ||
							isExporting;

						return (
							<S.StyledButton
								type="primary"
								htmlType="submit"
								loading={createLinkMutation.isPending}
								disabled={isDisabled}
							>
								Salvar link
							</S.StyledButton>
						);
					}}
				</Form.Item>
			</Form>
		</S.CardContainer>
	);
};
