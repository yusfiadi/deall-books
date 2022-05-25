import React from "react";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";

type Props = {
  category: {
    id: number;
    name: string;
  };
  selected: boolean;
};

const CategoryChip = (props: Props) => {
  const router = useRouter();

  const handleSelectCategory = (categoryId: number) => {
    router.push(categoryId === 1 ? `` : `?categoryId=${categoryId}`);
  };
  return (
    <Chip
      label={props.category.name}
      variant={props.selected ? "filled" : "outlined"}
      onClick={() => handleSelectCategory(props.category.id)}
    />
  );
};

export default CategoryChip;
