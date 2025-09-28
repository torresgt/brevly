import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useExportLinksMutation } from "@/features/mutations/export-links";
import { linksQueries } from "@/features/queries";
import { LinkItem } from "../LinkItem";
import * as S from "./styles";

interface MyLinksCardProp {
	handleCSVExportation: () => Promise<void>;
}

export const MyLinksCard = ({ handleCSVExportation }: MyLinksCardProp) => {
	const { data: linksData } = useQuery(linksQueries.allLinks());
	const exportLinksMutation = useExportLinksMutation();

	return (
		<S.CardContainer>
			<S.Header>
				<S.Title>Meus links</S.Title>
				<S.DownloadButton
					icon={
						exportLinksMutation.isPending ? (
							<LoadingOutlined />
						) : (
							<DownloadOutlined />
						)
					}
					disabled={!linksData || linksData.total === 0}
					onClick={handleCSVExportation}
				>
					Baixar CSV
				</S.DownloadButton>
			</S.Header>

			<S.StyledDivider />

			{!linksData || linksData.total === 0 ? (
				<S.EmptyStateContainer>
					<S.EmptyStateIcon />
					<S.EmptyStateText>
						AINDA NÃO EXISTEM LINKS CADASTRADOS
					</S.EmptyStateText>
				</S.EmptyStateContainer>
			) : (
				<S.LinkListingContainer>
					{linksData.links.map((link) => {
						return (
							<LinkItem
								key={link.id}
								link={link}
								csvIsPending={exportLinksMutation.isPending}
							/>
						);
					})}
				</S.LinkListingContainer>
			)}
		</S.CardContainer>
	);
};
