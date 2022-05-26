import React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  keyword: string;
  handleChange: (event: any) => void;
};

const SearchInput = (props: Props) => {
  console.log(props.keyword);
  return (
    <FormControl sx={{ width: "100%", my: 3 }} variant="outlined">
      <OutlinedInput
        id="search-keyword"
        type={"text"}
        placeholder="Search this category"
        value={props.keyword}
        size={"small"}
        onChange={props.handleChange}
        startAdornment={
          <InputAdornment position="start" style={{ marginRight: "0" }}>
            <IconButton edge="start">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        style={{
          borderRadius: "10px",
        }}
        color="primary"
      />
    </FormControl>
  );
};

export default SearchInput;
