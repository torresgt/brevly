import { Form, Input } from "antd";
import * as S from "./styles";

export const NewLinkCard = () => {
	const [form] = Form.useForm();

	const handleSubmit = (values: {
		originalLink: string;
		shortLink: string;
	}) => {
		console.log("Valores do formulário:", values);
		alert(
			`Link Original: ${values.originalLink}\nLink Encurtado: ${values.shortLink}`,
		);
	};

	return (
		<S.CardContainer>
			<S.CardTitle>Novo Link</S.CardTitle>
			<Form
				form={form}
				layout="vertical"
				requiredMark={false}
				onFinish={handleSubmit}
			>
				<Form.Item
					label="LINK ORIGINAL"
					name="originalLink"
					rules={[
						{ required: true, message: "Por favor, insira o link original!" },
					]}
				>
					<Input placeholder="www.exemplo.com.br" />
				</Form.Item>

				<Form.Item
					label="LINK ENCURTADO"
					name="shortLink"
					rules={[
						{ required: true, message: "Por favor, insira o link encurtado!" },
					]}
				>
					<Input placeholder="brev.ly/" />
				</Form.Item>

				<S.StyledButton type="primary" htmlType="submit">
					Salvar link
				</S.StyledButton>
			</Form>
		</S.CardContainer>
	);
};
