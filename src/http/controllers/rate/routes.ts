import { FastifyInstance } from "fastify";
import { register } from "./register";

export async function rateRoutes(app: FastifyInstance) {
  app.post("/rates", register);
}
