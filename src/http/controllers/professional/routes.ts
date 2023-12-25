import { FastifyInstance } from "fastify";
import { registerProfessional } from "./register";
import { registerProfessionalWorkers } from "./register-workers";
import { update } from "./update-adm";
import { updateWorkers } from "./update-workers";

export async function professionalRoutes(app: FastifyInstance) {
  app.post("/professionals", registerProfessional);
  app.post("/professionals/workers", registerProfessionalWorkers);
  app.put("/professionals", update);
  app.put("/professionals/workers", updateWorkers);
}
