import Header from "./components/Header"
import Navbaren from "./components/Navbaren"
import DrinkModal from "./components/DrinkModal";
import Favorites from "./pages/Favorites"
import SpinningWheel from "./pages/SpinningWheel"
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Navbaren  />
            <DrinkModal />
            <main>
                <Routes>
                    <Route path="/" element={<Navigate to="/favorites" replace />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/wheel" element={<SpinningWheel />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;