import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SegmentIcon from "@mui/icons-material/Segment";
import AlarmIcon from "@mui/icons-material/Alarm";

import SuccessBookmarkAlert from "../Alert/SuccessBookmarkAlert";

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
  myBooks: any;
  handleBookmark: (book: any) => void;
  handleUnbookmark: (title: string) => void;
  isBookmarkPage?: boolean;
};

const CustomCard = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  box-shadow: 24;
  @media (min-width: 600px) {
    width: 60%;
  }
  @media (min-width: 900px) {
    width: 50%;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
  :focus-visible {
    outline: 0;
  }
  max-height: 80%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const CustomCardContent = styled(CardContent)`
  :focus-visible {
    outline: 0;
  }
  padding-top: 0;
`;

const ImageWrapper = styled.div`
  text-align: center;
  padding: 16px; // same as the spread of the box shadow
  span {
    overflow: visible !important;
  }
  img {
    border-radius: 10px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
  }
`;

const SectionWrapper = styled.div`
  margin: 0.5em 0;
  :last-child {
    margin-bottom: 0;
  }
`;

const CustomList = styled.ol`
  margin: 0;
  padding-left: 20px;
  li {
    color: #072873;
    padding: 10px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const CustomBookmarkButton = styled(IconButton)`
  background-color: #ebf5fe;
  :hover {
    background-color: #ebf5fe;
  }
`;

const CustomSpan = styled.span`
  vertical-align: super;
  line-height: 32px;
  font-size: 14px;
`;

const BookModal = (props: Props) => {
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const handleOpenSuccessAlert = () => setOpenSuccessAlert(true);
  const handleCloseSuccessAlert = () => setOpenSuccessAlert(false);

  return (
    <>
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
          <CustomCard>
            <CardHeader
              style={{ padding: "16px 24px 0" }}
              action={
                <>
                  {props.myBooks.some(
                    (book: any) => book.title === props.book.title
                  ) ? (
                    <CustomBookmarkButton
                      color="primary"
                      onClick={() => {
                        props.handleUnbookmark(props.book.title);
                        if (props.isBookmarkPage) {
                          props.handleClose();
                        }
                      }}
                    >
                      <BookmarkIcon />
                    </CustomBookmarkButton>
                  ) : (
                    <CustomBookmarkButton
                      color="primary"
                      onClick={() => {
                        props.handleBookmark(props.book);
                        handleOpenSuccessAlert();
                      }}
                    >
                      <BookmarkBorderIcon />
                    </CustomBookmarkButton>
                  )}
                </>
              }
            />
            <CustomCardContent>
              <ImageWrapper>
                <Image
                  src={props.book.cover_url}
                  alt={props.book.title}
                  width={200}
                  height={300}
                />
              </ImageWrapper>
              <SectionWrapper>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="span"
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
                          <React.Fragment key={id}>
                            , and {author}
                          </React.Fragment>
                        );
                      else if (id > 0)
                        return (
                          <React.Fragment key={id}>, {author}</React.Fragment>
                        );
                      return <React.Fragment key={id}>{author}</React.Fragment>;
                    })}
                </Typography>
              </SectionWrapper>
              <Divider />
              <div style={{ marginBottom: "0.5em", marginTop: "0.5em" }}>
                <SegmentIcon />
                <CustomSpan>
                  {`${props.book.sections.length} ${
                    props.book.sections.length > 1 ? `chapters` : `chapter`
                  }
                  `}
                </CustomSpan>
                {props.book.audio_length > 60 && (
                  <>
                    &emsp;
                    <AlarmIcon />
                    <CustomSpan>
                      {`${Math.round(props.book.audio_length / 60)} min`}
                    </CustomSpan>
                  </>
                )}
              </div>
              <Divider />
              {props.book.description && props.book.description.length > 0 && (
                <SectionWrapper>
                  <Typography variant="h6" component={"h6"}>
                    What&apos;s it about?
                  </Typography>
                  <Typography component={"p"} gutterBottom>
                    {props.book.description}
                  </Typography>
                </SectionWrapper>
              )}
              {props.book.sections && props.book.sections.length > 0 && (
                <SectionWrapper>
                  <Typography variant="h6" component={"h6"}>
                    What&apos;s inside?
                  </Typography>
                  <CustomList>
                    {props.book.sections.map(
                      (
                        section: { title: string; content: string },
                        id: number
                      ) => {
                        return <li key={id}>{section.title}</li>;
                      }
                    )}
                  </CustomList>
                </SectionWrapper>
              )}
            </CustomCardContent>
          </CustomCard>
        </Fade>
      </Modal>
      <SuccessBookmarkAlert
        open={openSuccessAlert}
        handleClose={handleCloseSuccessAlert}
      />
    </>
  );
};

export default BookModal;
