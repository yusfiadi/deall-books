import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { GetServerSideProps } from "next";
import axios from "axios";
import Typography from "@mui/material/Typography";

import styles from "../styles/Home.module.css";
import AppBar from "./components/AppBar/AppBar";
import SearchInput from "./components/Input/SearchInput";
import CategoryStack from "./components/Category/CategoryStack";
import BookGrid from "./components/Book/BookGrid";
import PageButton from "./components/Button/PageButton";

type Props = {
  categories: {
    id: number;
    name: string;
  }[];
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
};

const Home: NextPage<Props> = ({ categories, books }) => {
  return (
    <Container maxWidth="sm">
      <main className={styles.main}>
        <CategoryStack categories={categories} />
        <BookGrid books={books} />
      </main>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let categoriesData = await axios.get(
    `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories`
  );
  let booksResponse = await axios.get(
    `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${
      context.query.categoryId ?? "1"
    }&page=0`
  );

  return {
    props: {
      categories: categoriesData.data,
      books: booksResponse.data,
    }, // will be passed to the page component as props
  };
};

export default Home;
