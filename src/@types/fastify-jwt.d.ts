import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };

    professional: {
      role: "ADMIN" | "WORKER";
      sub: string;
    };
  }
}
