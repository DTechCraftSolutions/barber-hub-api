import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { fetchAll } from "./fetch-all";
import { fetchByCityName } from "./fetch-by-city-name";

export async function barberRoutes(app: FastifyInstance) {
  app.post("/barbers", register);
  app.put("/barbers", update);
  app.get("/barbers", fetchAll);
  app.get("/barbers/:city/:name", fetchByCityName);
}
