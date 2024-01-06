import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
      sub: string;
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
