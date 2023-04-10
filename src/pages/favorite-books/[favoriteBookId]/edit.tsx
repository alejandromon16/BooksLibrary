import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";

import Layout from "src/core/layouts/Layout";
import getFavoriteBook from "src/favorite-books/queries/getFavoriteBook";
import updateFavoriteBook from "src/favorite-books/mutations/updateFavoriteBook";
import {
  FavoriteBookForm,
  FORM_ERROR,
} from "src/favorite-books/components/FavoriteBookForm";

export const EditFavoriteBook = () => {
  const router = useRouter();
  const favoriteBookId = useParam("favoriteBookId", "number");
  const [favoriteBook, { setQueryData }] = useQuery(
    getFavoriteBook,
    { id: favoriteBookId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateFavoriteBookMutation] = useMutation(updateFavoriteBook);

  return (
    <>
      <Head>
        <title>Edit FavoriteBook {favoriteBook.id}</title>
      </Head>

      <div>
        <h1>Edit FavoriteBook {favoriteBook.id}</h1>
        <pre>{JSON.stringify(favoriteBook, null, 2)}</pre>

        <FavoriteBookForm
          submitText="Update FavoriteBook"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateFavoriteBook}
          initialValues={favoriteBook}
          onSubmit={async (values) => {
            try {
              const updated = await updateFavoriteBookMutation({
                id: favoriteBook.id,
                ...values,
              });
              await setQueryData(updated);
              await router.push(
                Routes.ShowFavoriteBookPage({ favoriteBookId: updated.id })
              );
            } catch (error: any) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

const EditFavoriteBookPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditFavoriteBook />
      </Suspense>

      <p>
        <Link href={Routes.FavoriteBooksPage()}>FavoriteBooks</Link>
      </p>
    </div>
  );
};

EditFavoriteBookPage.authenticate = true;
EditFavoriteBookPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditFavoriteBookPage;
