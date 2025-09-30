import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envExamplePath = path.join(__dirname, "..", ".env.example");
const envPath = path.join(__dirname, "..", ".env");

if (!fs.existsSync(envPath)) {
	try {
		fs.copyFileSync(envExamplePath, envPath);
		console.log("✅ Arquivo .env criado com sucesso a partir do .env.example!");
		console.log(
			"👉 Lembre-se de preencher as variáveis do Cloudflare no novo arquivo .env",
		);
	} catch (error) {
		console.error("❌ Falha ao criar o arquivo .env:", error);
	}
} else {
	console.log("ℹ️ Arquivo .env já existe. Nenhuma ação foi necessária.");
}
