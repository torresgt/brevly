import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { linksQueries } from "../queries";

export const useDeleteLinkMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (linkId: string) => api.delete(`/urls/${linkId}`),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: linksQueries.all() }),
	});
};
