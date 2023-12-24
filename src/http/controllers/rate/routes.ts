import { FastifyInstance } from "fastify";
import { register } from "./register";
import { updateRate } from "./update";

export async function rateRoutes(app: FastifyInstance) {
  app.post("/rates", register);
  app.put("/rates", updateRate);
}
