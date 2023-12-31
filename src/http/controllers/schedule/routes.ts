import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function scheduleRoutes(app: FastifyInstance) {
  app.post("/schedules", register);
}
