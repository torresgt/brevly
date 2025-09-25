import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { linksQueries } from "../queries";

export const useExportLinksMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => api.post("/urls"),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: linksQueries.all() }),
	});
};
