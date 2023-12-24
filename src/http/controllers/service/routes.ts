import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function serviceRoutes(app: FastifyInstance) {
  app.post("/services", register);
}
