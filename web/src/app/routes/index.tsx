import {
	BrowserRouter,
	Navigate,
	Routes as ReactRoutes,
	Route,
} from "react-router-dom";
import { RedirectPage } from "@/pages/RedirectPage";
import { HomePage } from "../../pages/HomePage";

export const Routes = () => {
	return (
		<BrowserRouter>
			<ReactRoutes>
				<Route path="/" element={<Navigate to={"/home"} replace={false} />} />

				<Route path="/home" element={<HomePage />} />

				<Route path="/:shortener" element={<RedirectPage />} />
			</ReactRoutes>
		</BrowserRouter>
	);
};
