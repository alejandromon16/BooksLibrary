const Card = ({children}) => {
  return (
    <div className="card">
      {children}
      <style jsx>{`
        .card{
          padding: 20px;
          background-color: var(--color-white);
          box-shadow:var(--shadow-button);
          border-radius: var(--br-button);
        }

      `}</style>
    </div>
  )
}

export default Card;
