import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "@/env";
import {
	createLinkRoute,
	deleteLinkRoute,
	exportLinksRoute,
	getLinksRoute,
	redirectLinkRoute,
} from "./routes";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, _req, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	// Envia o erro p/ alguma ferramenta de observabilidade (Sentry/Datadog/grafana)
	console.log(error);

	return reply.status(500).send({ message: "Internal server error" });
});

server.register(fastifyCors, {
	origin: "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
});

// ROUTES
server.register(createLinkRoute);
server.register(getLinksRoute);
server.register(deleteLinkRoute);
server.register(exportLinksRoute);

server.register(redirectLinkRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server running!");
});
