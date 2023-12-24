import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";

export async function barberRoutes(app: FastifyInstance) {
  app.post("/barbers", register);
  app.put("/barbers", update);
}
