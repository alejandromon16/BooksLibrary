import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "src/core/components/Button";
import { FaThumbsUp } from 'react-icons/fa';

type BooksType = "fiction" | "action" | "history";

interface CarruselProps {
  type: BooksType
}

const Carrusel = ({type}: CarruselProps) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=subject:${type}&orderBy=newest&maxResults=10`)
      .then((response) => {
        setData(response.data.items);
        console.log(response);
      })
      .catch((error) => console.log(error));
  },[type]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    centerPadding: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h2>New {type} Books</h2>
      <Slider {...settings}>
        {data.map((item, index) => (
          <a href={`/book/${item?.id}`} key={item?.id}>
            <motion.div
              className="conte"
              initial={{ opacity: 0, y: 20 * index }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              style={{
                padding: "20px 0",
              }}
            >
              <motion.div
                className="cardbg"
                style={{
                  backgroundColor:"var(--color-white)",
                  position: "absolute",
                  top:"0",
                  bottom:"50px",
                  marginLeft:"70px",
                  marginRight:"10px",
                  width:"350px",
                  borderRadius:"var(--br-button)",
                  boxShadow:"var(--shadow-button)",
                  display:"flex",
                  flexDirection:"column",
                  justifyContent:"center",
                }}

              >
                <div className="book-card-details">
                  <div>
                  <h3>{item.volumeInfo.title}</h3>
                  <span>{item.volumeInfo.description.substring(0,60)}...</span>
                  </div>
                <Button
                href={`/books/${item.id}`}
                animationProps={{ transition: { duration: 0.3 } }}
              >
                See Details
              </Button>
                </div>



              </motion.div>
              <motion.div
                  className="book-card-image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: "relative",
                    bottom:"0",
                    right:"0",
                    outlineColor: "transparent",
                    height: "200px",
                  }}
                >
                    <img  src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />

                </motion.div>
            </motion.div>


          </a>

        ))}
      </Slider>

      <style jsx>{`
      .book-buy-now {
          background-color: var(--color-primary);
          padding: 10px 20px;
          color: var(--color-white);
          border-radius: 10px;
          margin: 20px 0;
          font-weight: var(--fw-bold);
        }

        .book-buy-now:hover {
            background-color: #0056b3;
        }

      a{
        outline:none;
        padding:15px 20px;
      }

      img{
        border-radius: 10px;
        height:210px;
        width: 140px;
      }

      .carousel-container {
        outline:none
        display:flex;
        content-justify:center;
        flex-direction: column;
        padding: var(--space-2xl) 0px;
        margin: 20px 0px;
        text-align: center;
      }

      .book-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 400px;
        margin: 0 20px;
        padding:0 20px;
        text-align: center;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: all 0.3s;
      }

      .book-card-details {
        position:relative;
        width:auto;
        display:flex;
        flex-wrap: wrap;
        margin:0 90px;
        text-align: left;
      }

      .book-card-details:hover {
        color: var(--color-body);
      }



      h2 {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 30px;
      }

      h3 {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        font-size: 14px;
        margin-bottom: 5px;
        color: #6c757d;
      }

      .slick-dots {
        bottom: -25px;
      }

      .slick-dots li button:before {
        font-size: 10px;
        color: #6c757d;
        opacity: 0.5;
      }

      .slick-dots li.slick-active button:before {
        opacity: 1;
      }

      .slick-prev,
      .slick-next {
        z-index: 1;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
        transition: all 0.3s;
        color: #3975ec; /* added */
      }

      .slick-prev:hover,
      .slick-next:hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: var(--color-primary); /* added */
      }

      .slick-prev {
        left: -20px;
      }

      .slick-next {
        right: -20px;
      }

      .slick-arrow{
        bacground-color: black;
      }

      @media screen and (max-width: 768px) {
        .book-card-image {
          height: 200px;
        }

        .book-card {
          width: 150px;
        }

        h3 {
          font-size: 16px;
        }

        p {
          font-size: 12px;
        }

        .slick-prev,
        .slick-next {
          width: 30px;
          height: 30px;
        }

        .slick-prev {
          left: -15px;
          background-color: var(--color-black);
        }

        .slick-next {
          right: -15px;
        }
      }

      `}</style>
    </div>
  );
};


export default Carrusel;
