import React from "react";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

import CategoryChip from "./CategoryChip";

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
};

const CategoryStack = (props: Props) => {
  const router = useRouter();
  const selectedCategoryId = router.query.categoryId
    ? Array.isArray(router.query.categoryId)
      ? router.query.categoryId[0]
      : router.query.categoryId
    : "1";

  return (
    <div style={{ marginBottom: "20px" }}>
      <Stack direction="column" spacing={2}>
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
      </Stack>
    </div>
  );
};

export default CategoryStack;
