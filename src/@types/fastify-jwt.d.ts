import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sign: {
        sub: string;
      };
    };

    professional: {
      role: "ADMIN" | "WORKER";
      sign: {
        sub: string;
      };
    };
  }
}
