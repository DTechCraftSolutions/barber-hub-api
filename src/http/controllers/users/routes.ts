import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { authenticate } from "./authenticate";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.put("/users/:id", update);
  app.post("/users/authenticate", authenticate);
}
