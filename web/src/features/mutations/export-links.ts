import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { ExportLinksResponse } from "@/types";
import { linksQueries } from "../queries";

export const useExportLinksMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => api.post<ExportLinksResponse>("/urls/export"),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: linksQueries.all() }),
	});
};
