import { FastifyInstance } from "fastify";
import { registerProfessional } from "./register";

export async function professionalRoutes(app: FastifyInstance) {
  app.post("/professionals", registerProfessional);
}
