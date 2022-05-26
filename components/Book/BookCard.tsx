import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

import BookModal from "./BookModal";

type Props = {
  book: {
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
  };
  myBooks: any;
  handleBookmark: (book: any) => void;
  handleUnbookmark: (title: string) => void;
  isBookmarkPage?: boolean;
};

const BookTitleStyled = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 1);
`;

const BookAuthorStyled = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, 0.5);
`;

const BookCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card
        onClick={handleOpen}
        style={{ cursor: "pointer", boxShadow: "none" }}
      >
        <CardMedia
          component="img"
          width={400}
          height={600}
          image={props.book.cover_url}
          alt={props.book.title}
          style={{
            height: "100%",
            objectFit: "initial",
            borderRadius: "10px",
          }}
        />
        <CardContent style={{ padding: "10px 0" }}>
          <BookTitleStyled variant="body1">{props.book.title}</BookTitleStyled>
          <BookAuthorStyled variant="body2" color="text.secondary">
            {props.book.authors[0]}
            {props.book.authors.length === 2 &&
              `, and ${props.book.authors[1]}`}
            {props.book.authors.length > 2 && `, and others}`}
          </BookAuthorStyled>
        </CardContent>
      </Card>
      <BookModal
        book={props.book}
        open={open}
        handleClose={handleClose}
        myBooks={props.myBooks}
        handleBookmark={(book: any) => props.handleBookmark(book)}
        handleUnbookmark={(title: string) => props.handleUnbookmark(title)}
        isBookmarkPage={props.isBookmarkPage}
      />
    </>
  );
};

export default BookCard;
