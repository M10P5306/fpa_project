import './DrinkCard.css';

function DrinkCard({ title, image, onRemove, onClick }) {
  return (
    <div className="col">
      <div className="card h-100" onClick={onClick}>
        {image && (
          <>
            <img src={image} className="card-img-top" alt={title} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              type="button"
              className="close-button"
              aria-label="Remove drink"
            >
              ×
            </button>
          </>
        )}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </div>
    </div>
  );
}

export default DrinkCard;