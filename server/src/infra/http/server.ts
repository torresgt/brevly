import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link";

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

server.register(fastifyCors, { origin: "*" });

server.register(createLinkRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server running!");
});
