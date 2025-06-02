import Header from "./components/Header"
import Navbaren from "./components/Navbaren"
import DrinkModal from "./components/DrinkModal";
import Favorites from "./pages/Favorites"
import SpinningWheel from "./pages/SpinningWheel"
import './App.css';
import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

    const [drink, setDrink] = useState("")
    const [favoriteDrinks,setFavoriteDrinks] = useState([]);

    useEffect(()=>{
        const favoriteDrinks = JSON.parse(localStorage.getItem("drinkList")) || [];
        setFavoriteDrinks(favoriteDrinks);
    }, []);

    const closeModal = () => {
        setDrink("")
    }

    return (
        <div>
        <BrowserRouter>
            <Header/>
            <Navbaren setDrink={setDrink} />
            <DrinkModal currentDrink={drink} onClose={closeModal} setFavoriteDrinks={setFavoriteDrinks}/>
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/favorites" replace />} />
                    <Route path="/favorites" element={<Favorites favoriteDrinks={favoriteDrinks} setFavoriteDrinks={setFavoriteDrinks} setDrink={setDrink}/>} />
                    <Route path="/wheel" element={<SpinningWheel favoriteDrinks={favoriteDrinks} setDrink={setDrink}/>} />
                </Routes>
            </main>
        </BrowserRouter>
        </div>
    );
}

export default App;