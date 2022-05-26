import React from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import CategoryChip from "./CategoryChip";

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

const CustomStack = styled(Stack)`
  display: flex;
  justify-content: left;
  flex-wrap: nowrap;
  list-style: none;
  margin: 0;
  overflow: auto;

  @media (max-width: 599px) {
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const CategoryStack = (props: Props) => {
  const router = useRouter();
  const selectedCategoryId = router.query.categoryId
    ? Array.isArray(router.query.categoryId)
      ? router.query.categoryId[0]
      : router.query.categoryId
    : "1";

  return (
    <div style={{ marginBottom: "20px" }}>
      <CustomStack direction="row" spacing={2}>
        {props.categories &&
          props.categories.length > 0 &&
          props.categories.map((category: any, id: number) => {
            return (
              <CategoryChip
                category={category}
                key={id}
                selected={selectedCategoryId === category.id.toString()}
              />
            );
          })}
      </CustomStack>
    </div>
  );
};

export default CategoryStack;
