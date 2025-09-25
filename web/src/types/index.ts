export interface AllLinksResponse {
	total: number;
	links: Links[];
}

interface Links {
	id: string;
	url: string;
	shortener: string;
	accescCount: number;
	createdAt: Date;
}
