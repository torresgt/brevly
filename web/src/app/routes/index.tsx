import {
	BrowserRouter,
	Navigate,
	Routes as ReactRoutes,
	Route,
} from "react-router-dom";
import { HomePage } from "../../pages/HomePage";

export const Routes = () => {
	return (
		<BrowserRouter>
			<ReactRoutes>
				<Route path="/">
					<Route index element={<Navigate to={"/home"} replace={false} />} />
					<Route path="/home" element={<HomePage />} />
				</Route>
			</ReactRoutes>
		</BrowserRouter>
	);
};
