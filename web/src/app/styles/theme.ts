import type { DefaultTheme } from "styled-components";

export const antdTheme = {
	token: {
		colorWhite: "#fff",
		colorBlack: "#000",
		colorPrimary: "#2C46B1",
		colorBackground: "#e4e6ec",
		colorText: "#4D505C",
		colorTitle: "#1F2025",
	},
};

export const styledTheme: DefaultTheme = {
	colors: {
		white: antdTheme.token.colorWhite,
		black: antdTheme.token.colorBlack,
		background: antdTheme.token.colorBackground,
		brand: antdTheme.token.colorPrimary,
		title: antdTheme.token.colorTitle,
		text: antdTheme.token.colorText,
	},
};
