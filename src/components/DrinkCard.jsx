function DrinkCard({ title, image, onRemove, onClick }) {
    return (
        <div className="col">
            <div className="card h-100"
                 style={{cursor: "pointer"}}
            onClick={onClick}>
                {image && (
                    <>
                    <img
                        src={image}
                        className="card-img-top"
                        alt={title}
                        style={{ objectFit: 'cover', height: '180px' }}
                    />
                    <button
                    onClick={(e) =>{
                        e.stopPropagation();
                        onRemove();
                    }}
                    type="button"
                    style={{
                        position: 'absolute',
                    }}
                    >X
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