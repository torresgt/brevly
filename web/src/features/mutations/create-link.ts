import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { linksQueries } from "../queries";

interface CreateLinkMutationProps {
	shortener: string;
	url: string;
}

export const useCreateLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateLinkMutationProps) =>
			api.post("/urls", data),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: linksQueries.all() }),
	});
};
