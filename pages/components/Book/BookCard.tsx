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
};

const CustomTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookCard = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card onClick={handleOpen} style={{ cursor: "pointer" }}>
        <CardMedia
          component="img"
          width={100}
          height={150}
          image={props.book.cover_url}
          alt={props.book.title}
        />
        <CardContent>
          <CustomTypography gutterBottom variant="body1">
            {props.book.title}
          </CustomTypography>
          <CustomTypography variant="body2" color="text.secondary">
            {props.book.authors[0]}
            {props.book.authors.length === 2 &&
              `, and ${props.book.authors[1]}`}
            {props.book.authors.length > 2 && `, and others}`}
          </CustomTypography>
        </CardContent>
      </Card>
      <BookModal book={props.book} open={open} handleClose={handleClose} />
    </>
  );
};

export default BookCard;
