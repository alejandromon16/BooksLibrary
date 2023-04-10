import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { usePaginatedQuery } from "@blitzjs/rpc";
import { useRouter } from "next/router";
import Layout from "src/core/layouts/Layout";
import getFavoriteBooks from "src/favorite-books/queries/getFavoriteBooks";

const ITEMS_PER_PAGE = 100;

export const FavoriteBooksList = () => {
  const router = useRouter();
  const page = Number(router.query.page) || 0;
  const [{ favoriteBooks, hasMore }] = usePaginatedQuery(getFavoriteBooks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <div>
      <ul>
        {favoriteBooks.map((favoriteBook) => (
          <li key={favoriteBook.id}>
            <Link
              href={Routes.ShowFavoriteBookPage({
                favoriteBookId: favoriteBook.id,
              })}
            >
              {favoriteBook.name}
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

const FavoriteBooksPage = () => {
  return (
    <Layout>
      <Head>
        <title>FavoriteBooks</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewFavoriteBookPage()}>Create FavoriteBook</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <FavoriteBooksList />
        </Suspense>
      </div>
    </Layout>
  );
};

export default FavoriteBooksPage;
