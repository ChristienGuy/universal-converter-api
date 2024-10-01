import { PrismaClient } from "@prisma/client";
import { FastifyTypeboxSchema } from "../types";
import { Type } from "@sinclair/typebox";

const prisma = new PrismaClient();

export default async function searchRoute(app: FastifyTypeboxSchema) {
  app.get(
    "/search",
    {
      schema: {
        querystring: Type.Object({
          q: Type.String(),
        }),
      },
    },
    async (request, reply) => {
      const { q } = request.query;
      const objects = await prisma.object.findMany({
        where: {
          name: {
            search: q,
          },
        },
      });

      return objects;
    }
  );
}
