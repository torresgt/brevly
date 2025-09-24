import { DownloadOutlined } from "@ant-design/icons";
import * as S from "./styles";

export const MyLinksCard = () => {
	return (
		<S.CardContainer>
			<S.Header>
				<S.Title>Meus links</S.Title>
				<S.DownloadButton icon={<DownloadOutlined />}>
					Baixar CSV
				</S.DownloadButton>
			</S.Header>

			<S.StyledDivider />

			<S.EmptyStateContainer>
				<S.EmptyStateIcon />
				<S.EmptyStateText>AINDA NÃO EXISTEM LINKS CADASTRADOS</S.EmptyStateText>
			</S.EmptyStateContainer>
		</S.CardContainer>
	);
};
