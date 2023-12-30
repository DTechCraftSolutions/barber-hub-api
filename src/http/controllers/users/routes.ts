import { FastifyInstance } from "fastify";
import { register } from "./register";
import { update } from "./update";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.put("/users/:id", update);
  app.post("/users/authenticate", authenticate);

  app.patch("/token/refresh/users", refresh);

  app.get("/me-users", { onRequest: [verifyJwt] }, profile);
}
