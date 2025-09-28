import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import brevlyLogo from "@/assets/brevly-logo.svg";
import { MyLinksCard, NewLinkCard } from "@/components";
import { useExportLinksMutation } from "@/features/mutations/export-links";
import * as S from "./styles";

export const HomePage = () => {
	const exportLinksMutation = useExportLinksMutation();

	const handleExportCSV = async () => {
		try {
			const promise = exportLinksMutation.mutateAsync();
			toast.promise(promise, {
				loading: "Exportando arquivo CSV...",
				error: "Ocorreu ao tentar exportar arquivo CSV.",
				success: (response: AxiosResponse<{ exportUrl: string }>) => {
					if (response.data.exportUrl) {
						window.location.href = response.data.exportUrl;
					}
					return (
						<S.ToastContainer>
							<S.CircleOutlined />

							<div>
								Arquivo CSV{" "}
								<span style={{ fontWeight: "bold" }}>exportado</span> com{" "}
								<span style={{ fontWeight: "bold" }}>sucesso</span>!
							</div>
						</S.ToastContainer>
					);
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<S.MainLayout>
			<S.Container>
				<S.ContentWrapper>
					<S.Logo src={brevlyLogo} alt="brev.ly logo" preview={false} />
					<S.CardsWrapper>
						<NewLinkCard isExporting={exportLinksMutation.isPending} />
						<MyLinksCard handleCSVExportation={handleExportCSV} />
					</S.CardsWrapper>
				</S.ContentWrapper>
			</S.Container>
		</S.MainLayout>
	);
};
