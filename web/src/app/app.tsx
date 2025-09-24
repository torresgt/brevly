import { QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import { Toaster } from "sonner";
import { ThemeProvider } from "styled-components";
import { queryClient } from "../services";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";
import { antdTheme, styledTheme } from "./styles/theme";

const App: React.FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigProvider theme={antdTheme} locale={ptBR}>
				<ThemeProvider theme={styledTheme}>
					<GlobalStyle />
					<Routes />
					<Toaster richColors closeButton position="top-right" />
				</ThemeProvider>
			</ConfigProvider>
		</QueryClientProvider>
	);
};

export { App };
