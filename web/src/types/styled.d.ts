import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			white: string;
			black: string;
			brand: string;
			background: string;
			title: string;
			text: string;
		};
	}
}
