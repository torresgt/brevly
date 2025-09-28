import { queryOptions } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { AllLinksResponse } from "@/types";

export const linksQueries = {
	all: () => ["links"],
	lists: () => [...linksQueries.all(), "list"],
	allLinks: () =>
		queryOptions({
			queryKey: [...linksQueries.all(), "all_links"],
			queryFn: () => fetchAllLinks(),
		}),
	redirectLink: (shortener: string) =>
		queryOptions({
			queryKey: [...linksQueries.all(), "redirect", shortener],
			queryFn: () => fetchRedirectLink(shortener),
			enabled: !!shortener,
		}),
};

const fetchAllLinks = async () => {
	const { data } = await api.get<AllLinksResponse>("/urls");

	return data;
};

const fetchRedirectLink = async (shortener: string) => {
	const { data } = await api.get(`/urls/${shortener}`);

	return data;
};
