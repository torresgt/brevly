import axios from "axios";

export const api = axios.create({
	// Coloque a URL onde sua API está rodando.
	// Se for localmente na porta 3333, por exemplo:
	baseURL: "http://localhost:3333",
});
