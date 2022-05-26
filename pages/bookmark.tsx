import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import styles from "../styles/Home.module.css";
import AppBar from "./components/AppBar/AppBar";
import BookGrid from "./components/Book/BookGrid";
import SearchInput from "./components/Input/SearchInput";

const MyBooksPage: NextPage = () => {
  const [myBooks, setMyBooks] = useState<any>([]);
  const isInitialMount = useRef(true);
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
    return myBooks.filter((book: any) =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  return (
    <>
      <AppBar />
      <Container maxWidth="sm">
        <main className={styles.main}>
          <div>
            <Typography
              textAlign={"left"}
              variant="h5"
              component={"h5"}
              gutterBottom
            >
              Bookmark
            </Typography>
          </div>
          <SearchInput
            keyword={keyword}
            handleChange={(event: any) => handleChange(event)}
          />
          {filterByKeyword().length > 0 ? (
            <BookGrid
              books={filterByKeyword()}
              myBooks={filterByKeyword()}
              handleBookmark={(book: any) => handleBookmark(book)}
              handleUnbookmark={(title: string) => handleUnbookmark(title)}
              isBookmarkPage={true}
            />
          ) : (
            <div>
              <Typography textAlign={"center"} component={"p"} gutterBottom>
                Let's bookmark some books!
              </Typography>
            </div>
          )}
        </main>
      </Container>
    </>
  );
};

export default MyBooksPage;
