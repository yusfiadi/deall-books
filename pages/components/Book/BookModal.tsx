import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

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
  open: boolean;
  handleClose: () => void;
};

const BookModal = (props: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Card sx={style}>
          <CardMedia
            component="img"
            width={100}
            height={150}
            image={props.book.cover_url}
            alt={props.book.title}
          />
          <CardContent>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h6"
              gutterBottom
            >
              {props.book.title}
            </Typography>
            <Typography
              id="transition-modal-description"
              component={"p"}
              gutterBottom
            >
              {props.book.authors &&
                props.book.authors.length > 0 &&
                props.book.authors.map((author: string, id: number) => {
                  if (id > 0 && id === props.book.authors.length - 1)
                    return (
                      <React.Fragment key={id}>, and {author}</React.Fragment>
                    );
                  else if (id > 0)
                    return <React.Fragment key={id}>, {author}</React.Fragment>;
                  return <React.Fragment key={id}>{author}</React.Fragment>;
                })}
            </Typography>
            <Divider />
            <div style={{ marginBottom: "0.35em", marginTop: "0.35em" }}>
              <Typography component={"span"}>
                {props.book.sections.length}{" "}
                {props.book.sections.length > 1 ? `chapters` : `chapter`}
              </Typography>
              {props.book.audio_length > 60 && (
                <>
                  &emsp;
                  <Typography component={"span"}>
                    {Math.round(props.book.audio_length / 60)} min
                  </Typography>
                </>
              )}
            </div>
            <Divider />
            {props.book.description && props.book.description.length > 0 && (
              <>
                <Typography variant="h6" component={"h6"}>
                  What's it about?
                </Typography>
                <Typography component={"p"}>
                  {props.book.description}
                </Typography>
              </>
            )}
            {props.book.sections && props.book.sections.length > 0 && (
              <>
                <Typography variant="h6" component={"h6"}>
                  What's inside?
                </Typography>
                <ul>
                  {props.book.sections.map(
                    (
                      section: { title: string; content: string },
                      id: number
                    ) => {
                      return <li key={id}>{section.title}</li>;
                    }
                  )}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      </Fade>
    </Modal>
  );
};

export default BookModal;
