import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateFavoriteBook = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateFavoriteBook),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favoriteBook = await db.favoriteBook.update({ where: { id }, data });

    return favoriteBook;
  }
);
