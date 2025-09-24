import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(() => {
	const config = {
		build: {
			outDir: "build",
			sourcemap: true,
			rollupOptions: {
				cache: false,
				maxParallelFileOps: 2,
				output: {
					manualChunks: (id: string) => {
						if (id.includes("node_modules")) {
							return "vendor";
						}
					},
				},
			},
		},
		server: { port: 3000, fs: { deny: [".env", ".env.*"] } },
		plugins: [react(), viteTsConfigPaths()],
		resolve: {
			dedupe: ["react", "react-dom"],
		},
	};

	return config;
});
