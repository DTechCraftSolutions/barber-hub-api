import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";

export async function serviceRoutes(app: FastifyInstance) {
  app.post("/services", register);
  app.put("/services", update);
}
