import { BlitzPage } from "@blitzjs/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BookCard from "src/books/components/BookDetail";
import Layout from "src/core/layouts/Layout";

const BookPageDetail: BlitzPage = () => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [book, setBook] = useState<any>();

  useEffect(() => {
    if (router.query && typeof router.query.id === "string") {
      setId(router.query.id);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchBook = async (id: string) => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      const data = await response.json();
      console.log(data);
      setBook(data);
    };
    if (id) {
      void fetchBook(id);
    }
  }, [id]);

  if (!book) {
    return <div>Loading book...</div>;
  }

  const { volumeInfo } = book;
  return (
    <Layout title={"Book Detail"} isLogged={false}>
      <BookCard book={book} />
    </Layout>
  );
};

export default BookPageDetail;

