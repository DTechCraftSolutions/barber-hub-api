import { FastifyReply, FastifyRequest } from "fastify";

export async function refresh(
  request: FastifyRequest,
  reply: FastifyReply | any
) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign({
    sign: {
      sub: request.user.sub,
    },
  });

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: request.user.sub,
      expiresIn: "30d",
    },
  });

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
}
