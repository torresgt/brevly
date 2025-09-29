export interface AllLinksResponse {
	total: number;
	links: Links[];
}

export interface Links {
	id: string;
	url: string;
	shortener: string;
	accessCount: number;
	createdAt: Date;
}

export interface ExportLinksResponse {
	exportUrl: string;
}
