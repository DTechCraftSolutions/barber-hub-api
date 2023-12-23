import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function barberRoutes(app: FastifyInstance) {
  app.post("/barbers", register);
}
