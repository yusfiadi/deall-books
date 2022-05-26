import React from "react";
import Grid from "@mui/material/Grid";

import BookCard from "./BookCard";

type Props = {
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
  myBooks?: any;
  handleBookmark: (book: any) => void;
  handleUnbookmark: (title: string) => void;
  isBookmarkPage?: boolean;
};

const BookGrid = (props: Props) => {
  return (
    <Grid container spacing={2}>
      {props.books &&
        props.books.length > 0 &&
        props.books.map((book: any, id: number) => {
          return (
            <Grid item xs={6} md={4} key={id}>
              <BookCard
                book={book}
                myBooks={props.myBooks}
                handleBookmark={(book: any) => props.handleBookmark(book)}
                handleUnbookmark={(title: string) =>
                  props.handleUnbookmark(title)
                }
                isBookmarkPage={props.isBookmarkPage}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default BookGrid;
