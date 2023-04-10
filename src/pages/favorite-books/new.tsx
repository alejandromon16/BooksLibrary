import { Routes } from "@blitzjs/next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "@blitzjs/rpc";
import Layout from "src/core/layouts/Layout";
import createFavoriteBook from "src/favorite-books/mutations/createFavoriteBook";
import {
  FavoriteBookForm,
  FORM_ERROR,
} from "src/favorite-books/components/FavoriteBookForm";

const NewFavoriteBookPage = () => {
  const router = useRouter();
  const [createFavoriteBookMutation] = useMutation(createFavoriteBook);

  return (
    <Layout title={"Create New FavoriteBook"}>
      <h1>Create New FavoriteBook</h1>

      <FavoriteBookForm
        submitText="Create FavoriteBook"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateFavoriteBook}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const favoriteBook = await createFavoriteBookMutation(values);
            await router.push(
              Routes.ShowFavoriteBookPage({ favoriteBookId: favoriteBook.id })
            );
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.FavoriteBooksPage()}>FavoriteBooks</Link>
      </p>
    </Layout>
  );
};

NewFavoriteBookPage.authenticate = true;

export default NewFavoriteBookPage;
