import React from "react";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import styled from "@emotion/styled";

type Props = {
  disabledButton: boolean;
};

const PageButton = (props: Props) => {
  const router = useRouter();
  const pageQuery = router.query.page
    ? Array.isArray(router.query.page)
      ? router.query.page[0]
      : router.query.page
    : "0";

  const handleNextPage = () => {
    router.query.page = (parseInt(pageQuery) + 1).toString();
    router.push({ pathname: router.pathname, query: router.query }, undefined);
  };

  const handlePrevPage = () => {
    pageQuery === "1"
      ? delete router.query.page
      : (router.query.page = (parseInt(pageQuery) - 1).toString());
    router.push({ pathname: router.pathname, query: router.query }, undefined);
  };

  const CustomIconButton = styled(IconButton)`
    margin: 20px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  `;

  return (
    <div style={{ textAlign: "center" }}>
      <CustomIconButton
        onClick={handlePrevPage}
        disabled={pageQuery === "0" || props.disabledButton}
        color="primary"
      >
        <NavigateBeforeIcon />
      </CustomIconButton>
      <CustomIconButton
        onClick={handleNextPage}
        disabled={props.disabledButton}
        color="primary"
      >
        <NavigateNextIcon />
      </CustomIconButton>
    </div>
  );
};

export default PageButton;
