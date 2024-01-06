import { FastifyInstance } from "fastify";
import { registerProfessional } from "./register";
import { registerProfessionalWorkers } from "./register-workers";
import { update } from "./update-adm";
import { updateWorkers } from "./update-workers";
import { authenticateProfessional } from "./authenticate";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { profile } from "./profile";
import { refresh } from "./refresh";
import { getAll } from "./get-all";

export async function professionalRoutes(app: FastifyInstance) {
  app.post("/professionals", registerProfessional);
  app.post("/professionals/workers", registerProfessionalWorkers);
  app.post("/professionals/authenticate", authenticateProfessional);
  app.put("/professionals", update);
  app.put("/professionals/workers", updateWorkers);

  app.get("/all-professionals/:barberShopId", getAll);

  app.patch("/token/refresh/professional", refresh);

  app.get("/me-professional", { onRequest: [verifyJwt] }, profile);
}
