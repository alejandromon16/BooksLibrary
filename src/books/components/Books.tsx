import Book from "./Book";
import { motion } from "framer-motion";

interface BooksProps {
  data: any[];
}

const Books = ({ data }: BooksProps) => (
  <div className="book-container">
    {data.map((item, index) => (
      <motion.div
        key={item.id}
        className="book-item"
      >
        <Book item={item} index={index} key={item.id} />
      </motion.div>
    ))}

    <style jsx>{`
    .book-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .book-item {
      margin: 10px;
    }
    `}</style>
  </div>
);

export default Books;

