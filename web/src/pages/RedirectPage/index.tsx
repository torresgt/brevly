import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import brevlyLogo from "@/assets/mini-logo.svg";
import errorGraphic from "@/assets/not-found.svg";
import { linksQueries } from "@/features/queries";
import * as S from "./styles";

export const RedirectPage = () => {
	const { shortener } = useParams<{ shortener: string }>();

	const { data, isError } = useQuery(
		linksQueries.redirectLink(shortener as string),
	);

	useEffect(() => {
		if (data?.originalUrl) {
			const timer = setTimeout(() => {
				window.location.href = data.originalUrl;
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [data]);

	if (isError) {
		return (
			<S.MainLayout>
				<S.RedirectCard>
					<S.ErrorGraphic src={errorGraphic} alt="Erro 404" />
					<S.Title>Link não encontrado</S.Title>
					<S.Subtitle>
						O link que você está tentando acessar não existe, foi removido ou é
						uma URL inválida. Saiba mais em <a href="/home">brev.ly</a>.
					</S.Subtitle>
				</S.RedirectCard>
			</S.MainLayout>
		);
	}

	return (
		<S.MainLayout>
			<S.RedirectCard>
				<S.LogoIcon src={brevlyLogo} alt="Brev.ly Logo" />
				<S.Title>Redirecionando...</S.Title>
				<S.Subtitle>
					O link será aberto automaticamente em alguns instantes.
				</S.Subtitle>
				{data && (
					<S.FallbackText>
						Não foi redirecionado?{" "}
						<S.FallbackLink href={data?.originalUrl}>
							Acesse aqui
						</S.FallbackLink>
					</S.FallbackText>
				)}
			</S.RedirectCard>
		</S.MainLayout>
	);
};
