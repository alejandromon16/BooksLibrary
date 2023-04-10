import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"


const BookPage: BlitzPage = () => {

  return (
    <Layout title="Home" isLogged={false}>
        <div className="product-page">
          <div className="product-images">
            <img
              src="https://api-prod-minimal-v4.vercel.app/assets/images/products/product_1.jpg"
              alt="Nike Air Force 1 Ndestrukt"
            />
          </div>
          <div className="product-details">
            <h1 className="product-title">Nike Air Force 1 Ndestrukt</h1>
            <p className="product-price">$150.00</p>
            <div className="product-size">
              <label htmlFor="size-select">Size:</label>
              <select id="size-select">
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
            <div class="button-action">
              <button className="add-to-cart-button">Add to Favorite</button>
              <button className="add-to-cart-button">Download</button>
            </div>
            <div className="product-description">
              <h2>Description:</h2>
              <p>
                The Nike Air Force 1 Ndestrukt is a timeless classic that offers
                style and durability. Featuring a leather upper with perforations
                for ventilation, a padded collar and insole for comfort, and a
                rubber outsole for traction, this shoe is built to last.
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
        .product-page {
          display: flex;
          justify-content: space-between;
          margin: 0rem 20rem;
          margin-top: 10rem;
        }

        .product-images {
          display: flex;
          border-radius: 20px;
          flex-direction: column;
          justify-content: center;
        }

        .product-images img {
          width: 80%;
          margin-bottom: 1rem;
        }

        img{
          border-radius: 20px;
        }
        .button-action{
          display: flex;
          flex-direction: row;
        }
        .product-details {
          width: 50%;
          display: flex;
          flex-direction: column;
        }

        .product-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .product-price {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .product-size {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .product-size label {
          font-size: 1.5rem;
          margin-right: 1rem;
        }

        .product-size select {
          font-size: 1.5rem;
        }

        .add-to-cart-button {
          background-color: #006eff;
          color: #fff;
          font-size: 1.5rem;
          padding: 1rem;
          border: none;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .add-to-cart-button:hover {
          background-color: #0052cc;
          cursor: pointer;
        }

        .product-description {
          margin-top: 2rem;
        }

        .product-description h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .product-description p {
          font-size: 1.5rem;
        }
          `}</style>
    </Layout>
  )
}

export default BookPage
