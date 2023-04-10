/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";

interface BookProps {
  item: any;
  index: number;
}

const Book = ({ item, index }: BookProps) => {
  console.log(item);

  return (
    <a href={`/book/${item?.id}`} key={item?.id}>
    <motion.div
      className="book-card"
      initial={{ opacity: 0, y: 20 * index }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="book-card-wrapper">
        <div className="book-card-overlay"></div>
        <motion.div
          className="book-card-image"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={item.volumeInfo.imageLinks.thumbnail}
            alt={item.volumeInfo.title}
          />
        </motion.div>
        <div className="book-card-details">
          <h3>{item.volumeInfo.title}</h3>
        </div>
      </div>
    </motion.div>

    <style jsx>{`
    .book-card-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #f7f7f7;
      border-radius: 10px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }

    .book-card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.5) 50%,
        rgba(0, 0, 0, 0.8) 100%
      );
      border-radius: 10px;
    }

    .book-card-image {
      position: relative;
      z-index: 1;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 1rem;
    }

    .book-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .book-card-details {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #333;
    }

    .book-card-details h3 {
      font-size: 1.2rem;
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .book-card-details p {
      font-size: 1rem;
      margin: 0;
      margin-bottom: 1rem;
    }

    .book-card-details a {
      display: inline-block;
      font-size: 0.9rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      background-color: #007aff;
      color: #fff;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }

    .book-card-details a:hover {
      background-color: #0059ff;
    }


  `}</style>
</a>
  );
}


export default Book;
