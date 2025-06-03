import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbaren.css'
import {useEffect, useState} from "react";
import ListGroup from 'react-bootstrap/ListGroup';

function NavScrollExample({setDrink}) {

    const drink_url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    const ingredients_url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
    const random_url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [searchType, setSearchType] = useState("drink");

    useEffect(() => {

        setDisplayDropdown(false);
        const fetchCocktails = async () => {
            if (search.trim() === "") {
                setResults([]);
                setDisplayDropdown(false);
                return;
            }

            let base_url = "";

            if (searchType === "drink") {
                base_url = drink_url;
            }
            else {
                base_url = ingredients_url;
            }

            try {
                const response = await fetch(base_url + search);
                const data = await response.json();
                if (response.ok) {

                    if(searchType === "drink") {
                        setResults(data.drinks || []);
                        setDisplayDropdown(true);
                    }
                    else {
                        if (data.drinks != "no data found") {
                            setResults(data.drinks || []);
                            setDisplayDropdown(true);
                        }
                    }

                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchCocktails();
    }, [search, searchType]);

    const getRandom = async () => {
        try {
            const response = await fetch(random_url);
            const data = await response.json();
            if (response.ok) {
            setDrink(data.drinks[0] || []);
            }
} catch (error) {
        console.log(error)
    }
}

    const handleClick = async (drink,e) => {
        e.preventDefault();

        console.log(drink)

        if (searchType === "drink") {
            setDrink(drink);
            setSearch("")
        }
        else {
            setSearch("")
                try {

                    const response = await fetch(drink_url + drink.strDrink);
                    const data = await response.json();
                    console.log(data.drinks[0])
                    if (response.ok && data.drinks[0]) {
                        setDrink(data.drinks[0])
                    }
                } catch (error) {
                    console.log(error)
                }
        }
    }

    return (
            <Navbar expand="lg" className="darker-navbar">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <div className="row w-100 align-items-center">
                    <div className="col"></div>

                    <div className="col d-flex justify-content-center">
                    <Nav className="d-flex justify-content-evenly g-6" navbarScroll>
                        <Nav.Link href="/favorites" className='nav-link-bordered mx-2'>Favorites</Nav.Link>
                        <Nav.Link href="/Wheel" className='nav-link-bordered mx-2'>Spin the Wheel</Nav.Link>
                        <Nav.Link href="#" className='nav-link-bordered mx-2' onClick={(e) => {
                        e.preventDefault();
                        getRandom();
                        }}>
                        I feel lucky!
                        </Nav.Link>
                    </Nav>
                    </div>

                    <div className="col d-flex justify-content-end align-items-center gap-3">
                    <Form className="d-flex position-relative">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        />

                        {displayDropdown && results.length > 0 && (
                        <ListGroup
                            style={{
                            position: 'absolute',
                            top: '100%',
                            zIndex: 1000,
                            width: '100%',
                            maxHeight: '300px',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            }}
                        >
                            {results.map((drink) => (
                            <ListGroup.Item
                                key={drink.idDrink}
                                action
                                onClick={(e) => handleClick(drink, e)}
                            >
                                {drink.strDrink}
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )}
                    </Form>

                    <div className="form-check mb-0">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadio"
                        id="flexRadioDefault1"
                        value="drink"
                        checked={searchType === "drink"}
                        onChange={(e) => setSearchType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Drink
                        </label>
                    </div>

                    <div className="form-check mb-0">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadio"
                        id="flexRadioDefault2"
                        value="ingredient"
                        checked={searchType === "ingredient"}
                        onChange={(e) => setSearchType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Ingredient
                        </label>
                    </div>
                    </div>
                </div>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    );
}

export default NavScrollExample;