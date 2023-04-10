import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetFavoriteBooksInput
  extends Pick<
    Prisma.FavoriteBookFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetFavoriteBooksInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: favoriteBooks,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.favoriteBook.count({ where }),
      query: (paginateArgs) =>
        db.favoriteBook.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      favoriteBooks,
      nextPage,
      hasMore,
      count,
    };
  }
);
