import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateFavoriteBook = z.object({
  image: z.string(),
  bookID: z.string(),
  user: z.number(),

});

export default resolver.pipe(
  resolver.zod(CreateFavoriteBook),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favoriteBook = await db.favoriteBook.create({ data: input });

    return favoriteBook;
  }
);
