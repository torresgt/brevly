import brevlyLogo from "@/assets/brevly-logo.svg";
import { MyLinksCard, NewLinkCard } from "@/components";
import * as S from "./styles";

export const HomePage = () => {
	return (
		<S.MainLayout>
			<S.Container>
				<S.ContentWrapper>
					<S.Logo src={brevlyLogo} alt="brev.ly logo" preview={false} />
					<S.CardsWrapper>
						<NewLinkCard />
						<MyLinksCard />
					</S.CardsWrapper>
				</S.ContentWrapper>
			</S.Container>
		</S.MainLayout>
	);
};
