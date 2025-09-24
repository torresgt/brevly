import { queryOptions } from "@tanstack/react-query";
import { api } from "@/services/api";

export const linksQueries = {
	all: () => ["links"],
	lists: () => [...linksQueries.all(), "list"],
	allLinks: () =>
		queryOptions({
			queryKey: [...linksQueries.all(), "all_links"],
			queryFn: () => fetchAllLinks(),
		}),
};

const fetchAllLinks = async () => {
	const { data } = await api.get("");

	return data;
};
