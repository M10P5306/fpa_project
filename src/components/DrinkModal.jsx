import "./DrinkModal.css"
import {Modal, Button} from "react-bootstrap";
import {useEffect, useState} from "react";

function DrinkModal({currentDrink, onClose, setFavoriteDrinks}) {

    const [show, setShow] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect( () => {
            if (currentDrink) {
                setShow(true);
                get_ingredients();
                checkIfFavorite();
            }
            else {
                setShow(false);
            }
        }, [currentDrink]
    );

    const checkIfFavorite = () => {
        const savedDrinks = JSON.parse(localStorage.getItem("drinkList")) || [];
        const found = savedDrinks.some(drink => drink.idDrink === currentDrink.idDrink);
        setIsFavorite(found);
    };

    const makeFavorite = () => {
        let savedDrinks = localStorage.getItem("drinkList");
        if (savedDrinks) {
            let drinkArray = JSON.parse(savedDrinks);
            let inList = false;

            for (let i = 0; i < drinkArray.length; i++) {
                if (drinkArray[i].idDrink == currentDrink.idDrink) {
                    inList = true;
                    return;
                }
            }
            if (!inList) {
                drinkArray.push(currentDrink);
                localStorage.setItem("drinkList", JSON.stringify(drinkArray));
                const favoriteDrinks = JSON.parse(localStorage.getItem("drinkList")) || [];
                setFavoriteDrinks(favoriteDrinks);
            }
        }
        else {
            let list = [currentDrink]
            localStorage.setItem("drinkList", JSON.stringify(list));
            const favoriteDrinks = JSON.parse(localStorage.getItem("drinkList")) || [];
            setFavoriteDrinks(favoriteDrinks);
        }
        setIsFavorite(true);
    }

    const handleClose = () => {
        setShow(false);
        onClose();
    }

    const get_ingredients = () => {
        let ingredients = [];
        for (let i = 1; i < 16; i++) {
            let IngredientNumber = "strIngredient"+i
            let MeasureNumber = "strMeasure"+i
            let string_row = []
            if (currentDrink[IngredientNumber] != null) {
                string_row.push(currentDrink[IngredientNumber]);
                if (currentDrink[MeasureNumber] != null) {
                    string_row.push(", "+currentDrink[MeasureNumber]);
                }
                else {
                    string_row.push("");
                }
            }

            if (currentDrink[IngredientNumber] != null || currentDrink[MeasureNumber] != null) {
                ingredients.push(string_row);
            }
        }
        setIngredients(ingredients);
    }

    if (!currentDrink) return null;

    return (
        <div>
        <Modal show={show} onHide={handleClose} size="lg" centered className="drinkModal">
            <Modal.Header closeButton>
                <Modal.Title>{currentDrink.strDrink}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={currentDrink.strDrinkThumb} className="img-fluid" alt={"drink"}/>
                <h5>Ingredients</h5>
                <ul>{ingredients.map((ingredient, index) => {
                    return <li key={index}>{ingredient[0] + " " + ingredient[1]}</li>
                })}</ul>
                <h5>Instructions</h5>
                <p>{currentDrink.strInstructions}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={makeFavorite} className="favoriteButton" disabled={isFavorite}>
                {isFavorite ? "Favorited" : "Favorite"}
                </Button>
                <Button onClick={handleClose} className="closeButton">Close</Button></Modal.Footer>
        </Modal>
        </div>
    )
}

export default DrinkModal;