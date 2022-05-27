This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). This project is aim to display all books list with pagination, and then you can bookmark any book you want. On the bookmark page, you can see the bookmarked book list you owned, and you can unbookmark them one by one.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build with :
- React
- Next.js
- Material-UI
- TypeScript
- Emotion
- Axios

### Feedback for the API :
- If the categoryId query string is not provided, it is better to display the book results in all categories
- It is better to display the total number of books or the total number of pages to facilitate the pagination feature so that developers can find out which page the last book was on
- If the next page does not have a list of books, the API should still be accessible by returning an empty array of data
- When I was about to fetch API from the client-side, I encountered CORS errors, so I couldn't implement the infinite scroll feature. I think it can be fixed in the API configuration
- There are several titles of the same book but have different ids, so to identify a book, the developer cannot use an id because the book id is not unique, but uses the book title.

### Thank you

