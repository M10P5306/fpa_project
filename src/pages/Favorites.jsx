import { Form } from 'react-bootstrap';
import DrinkCard from '../components/DrinkCard.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function Favorites({ favoriteDrinks = [], setFavoriteDrinks, setDrink }) {
  const [filter, setFilter] = useState(""); 
  
  const displayDrink = (drink) => {
    setDrink(drink);
  };

  const removeDrink = (idDrink) => {
    const drinkToRemove = favoriteDrinks.find(drink => drink.idDrink === idDrink);
    const updatedDrinks = favoriteDrinks.filter(drink => drink.idDrink !== idDrink);
    localStorage.setItem('drinkList', JSON.stringify(updatedDrinks));
    setFavoriteDrinks(updatedDrinks);
    toast.info(`${drinkToRemove.strDrink} removed from favorites`, { position: 'top-center' });
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="mb-4">Your Favorite Drinks</h2>
        <Form>
          <Form.Control
            type="search"
            placeholder="Search drink..."
            className="mb-4"
            aria-label="Search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </Form>
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4">
          {favoriteDrinks.filter((drink) => drink.strDrink.toLowerCase().includes(filter.toLowerCase())).map(drink => (
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
      <ToastContainer autoClose={2000} hideProgressBar position="top-center" />
    </>
  );
}

export default Favorites;
