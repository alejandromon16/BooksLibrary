import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import db from "db"
import { useRouter } from "next/router"
import React, { Suspense, useContext } from "react"
import Button from "src/core/components/Button"
import getFavoriteBook from "src/favorite-books/queries/getFavoriteBook"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

interface Book {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    industryIdentifiers?: {
      type: string
      identifier: string
    }[]
    pageCount?: number
    printType?: string
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    maturityRating?: string
    imageLinks?: {
      smallThumbnail: string
      thumbnail: string
    }
    language?: string
    previewLink?: string
    infoLink?: string
    canonicalVolumeLink?: string
  }
  saleInfo?: {
    country: string
    saleability: string
    isEbook: boolean
    listPrice?: {
      amount: number
      currencyCode: string
    }
    retailPrice?: {
      amount: number
      currencyCode: string
    }
    buyLink?: string
    offers?: {
      finskyOfferType: number
      listPrice?: {
        amountInMicros: number
        currencyCode: string
      }
      retailPrice?: {
        amountInMicros: number
        currencyCode: string
      }
    }[]
  }
  accessInfo?: {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string
    epub?: {
      isAvailable: boolean
      acsTokenLink?: string
    }
    pdf?: {
      isAvailable: boolean
      acsTokenLink?: string
    }
    webReaderLink?: string
    accessViewStatus?: string
    quoteSharingAllowed?: boolean
  }
  searchInfo?: {
    textSnippet?: string
  }
}

interface Props {
  book: Book
}


const AddToFavorite = ({id}) => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const getBook = true;

  if(currentUser){
      if(getBook){
        return (<>
          <Button
            type="button"
            style={{
              backgroundColor:"var(--color-shade-200)",
            }}
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
                role="img"
                className="icon"
              >
                <path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z"></path>
              </svg>
          </Button>
        </>)
      }else{
        return (<>
          <Button
            type="button"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                enable-background="new 0 0 24 24"
                viewBox="0 0 24 24"
                role="img"
                className="icon"
              >
                <path d="m18.199 2.04c-2.606-.284-4.262.961-6.199 3.008-2.045-2.047-3.593-3.292-6.199-3.008-3.544.388-6.321 4.43-5.718 7.96.966 5.659 5.944 9 11.917 12 5.973-3 10.951-6.341 11.917-12 .603-3.53-2.174-7.572-5.718-7.96z"></path>
              </svg>
          </Button>
        </>)

      }
  }

  return(<></>)
}

const BookCard: React.FC<Props> = ({ book }) => {

  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" />
      </div>
      <div className="book-details">
        <h2 className="book-title">{book.volumeInfo?.title}</h2>
        {book.volumeInfo?.subtitle && <h3 className="book-subtitle">{book.volumeInfo.subtitle}</h3>}
        {book.volumeInfo?.authors && (
          <p className="book-author">
            By:{" "}
            {book.volumeInfo.authors?.map((author, index) => (
              <React.Fragment key={index}>
                {author}
                {index < book.volumeInfo.authors?.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
        )}
        {book.volumeInfo?.publisher && (
          <p className="book-publisher">Publisher: {book.volumeInfo.publisher}</p>
        )}
        {book.volumeInfo?.publishedDate && (
          <p className="book-published-date">Published Date: {book.volumeInfo.publishedDate}</p>
        )}
        {book.volumeInfo?.description && (
          <p className="book-description">Description: {book.volumeInfo.description}</p>
        )}
        {book.volumeInfo?.pageCount && (
          <p className="book-page-count">Page Count: {book.volumeInfo.pageCount}</p>
        )}
        {book.volumeInfo?.categories && (
          <p className="book-categories">
            Categories:{" "}
            {book.volumeInfo.categories?.map((category, index) => (
              <React.Fragment key={index}>
                {category}
                {index < book.volumeInfo.categories?.length && ", "}
              </React.Fragment>
            ))}
          </p>
        )}
        {book.volumeInfo?.averageRating && (
          <p className="book-average-rating">Average Rating: {book.volumeInfo.averageRating}</p>
        )}
        {book.volumeInfo?.ratingsCount && (
          <p className="book-ratings-count">Ratings Count: {book.volumeInfo.ratingsCount}</p>
        )}
        {book.saleInfo?.listPrice && (
          <p className="book-price">
            Price: {book.saleInfo.listPrice.amount} {book.saleInfo.listPrice.currencyCode}
          </p>
        )}
        {book.volumeInfo?.language && (
          <p className="book-language">Language: {book.volumeInfo.language}</p>
        )}
        {book.accessInfo?.epub && book.accessInfo.epub.isAvailable && (
          <a
            href={book.accessInfo.epub.acsTokenLink || book.volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="book-read-ebook"
          >
            Read Ebook
          </a>
        )}
        {book.accessInfo?.pdf && book.accessInfo.pdf.isAvailable && (
          <a
            href={book.accessInfo.pdf.acsTokenLink || book.volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="book-read-pdf"
          >
            Read PDF
          </a>
        )}
        {book.saleInfo?.buyLink && (
          <a
            href={book.saleInfo.buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="book-buy-now"
          >
            Buy Now
          </a>
        )}
      </div>
      <div>
        <Suspense>
          <AddToFavorite id={book.id} />
        </Suspense>
      </div>
      <style jsx>{`
        .book-read-ebook {
          background-color: var(--color-primary);
          padding: 10px 20px;
          color: var(--color-white);
          border-radius: 10px;
          font-weight: var(--fw-bold);
        }
        .like-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: var(--color-primary);
          color: #444;
          outline: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .icon{
          fill: var(--color-white);
        }

        .icon:hover{
          fill: var(--color-primary);
        }

        .like-btn:hover {
          background-color: #e1e1e1;
        }

        .like-btn.active {
          background-color: #ea4c89;
          color: #fff;
        }

        .like-btn.active:hover {
          background-color: #d3326b;
        }

        .like-btn .icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
          background-image: url("path/to/heart-icon.svg");
          background-repeat: no-repeat;
          background-size: contain;
        }

        .like-btn .count {
          margin-left: 8px;
          font-size: 14px;
          font-weight: normal;
        }
        .book-read-pdf {
          background-color: var(--color-primary);
          padding: 10px 20px;
          color: var(--color-white);
          border-radius: 10px;
          font-weight: var(--fw-bold);
        }

        .book-buy-now {
          background-color: var(--color-primary);
          padding: 10px 20px;
          color: var(--color-white);
          border-radius: 10px;
          font-weight: var(--fw-bold);
        }
        .book-card {
          display: flex;
          margin: 10rem 20rem;
          background-color: var(--color-white);
          padding: 2rem 0rem;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .book-cover {
          width: 30%;
          height: 50%;
          padding: 3rem;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
          overflow: hidden;
        }

        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 15px;
        }

        .book-details {
          width: 60%;
          padding: 20px;
        }

        .book-details h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .book-details h3 {
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 10px;
          color: #666;
        }

        .book-details p {
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 10px;
        }

        .book-details a {
          margin-right: 10px;
        }

        .book-details button {
          padding: 10px 20px;
          background-color: #f44336;
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .book-details button:hover {
          background-color: #ff6659;
        }

        .book-details button:focus {
          outline: none;
          box-shadow: 0px 0px 0px 2px rgba(244, 67, 54, 0.5);
        }

        .book-details button:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  )
}

export default BookCard
function createFavoriteBookMutation(values: any) {
  throw new Error("Function not implemented.")
}

function values(values: any) {
  throw new Error("Function not implemented.")
}

