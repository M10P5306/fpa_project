import DrinkCard from '../components/DrinkCard.jsx';

function Favorites({favoriteDrinks = [], setFavoriteDrinks, setDrink}) {

    const displayDrink = (drink) => {
        setDrink(drink);
    }

    const removeDrink = (idDrink) => {
        const updatedDrinks = favoriteDrinks.filter(drink => drink.idDrink !== idDrink)
        localStorage.setItem('drinkList', JSON.stringify(updatedDrinks));
        setFavoriteDrinks(updatedDrinks);
    }

    return (
        <div className="container py-4">
            <h2 className="mb-4">Your Favorite Drinks</h2>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
                {favoriteDrinks.map(drink => (
                    <DrinkCard
                        key={drink.idDrink}
                        title={drink.strDrink}
                        image={drink.strDrinkThumb}
                        onRemove={() => removeDrink(drink.idDrink)}
                        onClick={() => displayDrink(drink)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Favorites;