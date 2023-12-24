import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { barberRoutes } from "./http/controllers/barber/routes";
import { serviceRoutes } from "./http/controllers/service/routes";
export const app = fastify();

app.register(usersRoutes);
app.register(barberRoutes);
app.register(serviceRoutes);
