import fastify from "fastify";
import { usersRoutes } from "./http/controllers/users/routes";
import { barberRoutes } from "./http/controllers/barber/routes";
import { serviceRoutes } from "./http/controllers/service/routes";
import { rateRoutes } from "./http/controllers/rate/routes";
import { professionalRoutes } from "./http/controllers/professional/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { scheduleRoutes } from "./http/controllers/schedule/routes";
export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);
app.register(usersRoutes);
app.register(barberRoutes);
app.register(serviceRoutes);
app.register(rateRoutes);
app.register(professionalRoutes);
app.register(scheduleRoutes);
