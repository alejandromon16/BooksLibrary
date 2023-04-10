import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteFavoriteBook = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteFavoriteBook),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favoriteBook = await db.favoriteBook.deleteMany({ where: { id } });

    return favoriteBook;
  }
);
