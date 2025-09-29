import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteLinkMutation } from "@/features/mutations/delete-link";
import type { Links } from "@/types";
import * as S from "./styles";

interface LinkItemProps {
	link: Links;
	csvIsPending: boolean;
}

export const LinkItem = ({ link, csvIsPending }: LinkItemProps) => {
	const [copied, setCopied] = useState(false);

	const deleteLinkMutation = useDeleteLinkMutation();

	const handleCopy = async () => {
		const url = link.url;
		try {
			await navigator.clipboard.writeText(url);

			setCopied(true);

			setTimeout(() => {
				setCopied(false);
			}, 1500);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = () => {
		try {
			const promise = deleteLinkMutation.mutateAsync(link.id);
			toast.promise(promise, {
				loading: "Deletando link...",
				error: (error: Error) =>
					`Ocorreu um problema ao tentar deletar link: ${error}`,
				success: () => {
					return (
						<S.ToastContainer>
							<S.CircleOutlined />

							<div>
								Url <span style={{ fontWeight: "bold" }}>deletada</span> com{" "}
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
		<S.LinkItemWrapper>
			<S.LinkDetails>
				<S.ShortUrl
					href={`/${link.shortener}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{`brev.ly/${link.shortener}`}
				</S.ShortUrl>
				<S.OriginalUrl>{link.url}</S.OriginalUrl>
			</S.LinkDetails>

			<S.LinkActions>
				<S.AccessCount>{`${link.accessCount} acessos`}</S.AccessCount>
				<Tooltip title="copied" open={copied}>
					<S.ActionButton
						icon={<CopyOutlined />}
						onClick={handleCopy}
						disabled={csvIsPending}
					/>
				</Tooltip>
				<S.ActionButton
					icon={<DeleteOutlined />}
					onClick={handleDelete}
					disabled={csvIsPending}
				/>
			</S.LinkActions>
		</S.LinkItemWrapper>
	);
};
