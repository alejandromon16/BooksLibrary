import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetFavoriteBook = z.object({
  // This accepts type of undefined, but is required at runtime
  bookID: z.string().optional().refine(Boolean, "Required"),
  UserID: z.string(),
});

export default resolver.pipe(
  resolver.zod(GetFavoriteBook),
  resolver.authorize(),
  async ({ id, UserID }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const favoriteBook = await db.favoriteBook.findFirst({ where: { bookID:id, User: UserID } });

    if (!favoriteBook) throw new NotFoundError();

    return favoriteBook;
  }
);
