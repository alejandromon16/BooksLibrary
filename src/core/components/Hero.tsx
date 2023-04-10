import React from "react"

const Hero = () => {
  return (
    <div className="hero-container">
      <img
        src="https://img.freepik.com/free-vector/online-library-app-reading-banner_33099-1733.jpg"
        alt="Bookstore hero image"
      />
      <div className="hero-text">
        <h1>Welcome to our bookstore!</h1>
        <p>
          Discover your next favorite book with our extensive selection of literature, non-fiction,
          and children's books.
        </p>
        <button>Browse Books</button>
      </div>

      <style>
        {`
      .hero-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 500px;
        background-color: #f1f1f1;
      }

      .hero-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.7;
      }


      .hero-text {
        position: relative;
        text-align: center;
        width:100%;
        z-index: 1;
        background: linear-gradient(
          to bottom,
          rgba(223, 0, 0, 0.0) 0%,
          rgba(0, 0, 0, 0.3) 100%
        );
        color: #fff;
        padding: 10rem 0;
      }

.hero-text h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero-text p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.hero-text button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: var(--color-white);
  transition: all 0.3s ease;
  background-color: #007bff;
}

.hero-text button:hover {
  background-color: #0056b3;
}


      `}
      </style>
    </div>
  )
}

export default Hero
