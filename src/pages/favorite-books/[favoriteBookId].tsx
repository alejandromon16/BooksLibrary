import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getFavoriteBook from "src/favorite-books/queries/getFavoriteBook";
import deleteFavoriteBook from "src/favorite-books/mutations/deleteFavoriteBook";

export const FavoriteBook = () => {
  const router = useRouter();
  const favoriteBookId = useParam("favoriteBookId", "number");
  const [deleteFavoriteBookMutation] = useMutation(deleteFavoriteBook);
  const [favoriteBook] = useQuery(getFavoriteBook, { id: favoriteBookId });

  return (
    <>
      <Head>
        <title>FavoriteBook {favoriteBook.id}</title>
      </Head>

      <div>
        <h1>FavoriteBook {favoriteBook.id}</h1>
        <pre>{JSON.stringify(favoriteBook, null, 2)}</pre>

        <Link
          href={Routes.EditFavoriteBookPage({
            favoriteBookId: favoriteBook.id,
          })}
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteFavoriteBookMutation({ id: favoriteBook.id });
              await router.push(Routes.FavoriteBooksPage());
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const ShowFavoriteBookPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.FavoriteBooksPage()}>FavoriteBooks</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <FavoriteBook />
      </Suspense>
    </div>
  );
};

ShowFavoriteBookPage.authenticate = true;
ShowFavoriteBookPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowFavoriteBookPage;
