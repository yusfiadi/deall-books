import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { GetServerSideProps } from "next";
import axios from "axios";
import Typography from "@mui/material/Typography";

import styles from "../styles/Home.module.css";
import AppBar from "./components/AppBar/AppBar";
import SearchInput from "./components/Input/SearchInput";
import CategoryStack from "./components/Category/CategoryStack";
import BookGrid from "./components/Book/BookGrid";
import PageButton from "./components/Button/PageButton";

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
  books: {
    id: number;
    title: string;
    category_id: number;
    authors: string[];
    cover_url: string;
    description: string;
    sections: {
      title: string;
      content: string;
    }[];
    audio_length: number;
  }[];
};

const Home: NextPage<Props> = ({ categories, books }) => {
  const isInitialMount = useRef(true);
  const [myBooks, setMyBooks] = useState<any>([]);
  const [keyword, setKeyword] = useState("");
  const handleChange = (event: any) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    setMyBooks(JSON.parse(window.localStorage.getItem("my_books") ?? "[]"));
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      window.localStorage.setItem("my_books", JSON.stringify(myBooks));
    }
  }, [myBooks]);

  const handleBookmark = (book: any) => {
    setMyBooks([...myBooks, { ...book }]);
  };

  const handleUnbookmark = (title: string) => {
    setMyBooks(myBooks.filter((book: any) => book.title !== title));
  };

  const filterByKeyword = () => {
    return books.filter((book: any) =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={styles.main}>
          <SearchInput
            keyword={keyword}
            handleChange={(event: any) => handleChange(event)}
          />
          <CategoryStack categories={categories} />
          {filterByKeyword().length > 0 ? (
            <>
              <BookGrid
                books={filterByKeyword()}
                myBooks={myBooks}
                handleBookmark={(book: any) => handleBookmark(book)}
                handleUnbookmark={(title: string) => handleUnbookmark(title)}
              />
              {keyword.length === 0 && (
                <PageButton disabledButton={filterByKeyword().length < 12} />
              )}
            </>
          ) : (
            <div>
              <Typography textAlign={"center"} component={"p"} gutterBottom>
                Your favorite book will be added every Monday. Stay tuned!
              </Typography>
            </div>
          )}
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let categoriesData = await axios.get(
    `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories`
  );
  let booksResponse = await axios.get(
    `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${
      context.query.categoryId ?? "1"
    }&page=0`
  );

  return {
    props: {
      categories: categoriesData.data,
      books: booksResponse.data,
    }, // will be passed to the page component as props
  };
};

export default Home;
