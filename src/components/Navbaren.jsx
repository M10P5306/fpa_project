import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand><img
                    src={"https://static.vecteezy.com/system/resources/thumbnails/055/064/681/small/holiday-beach-cocktail-with-small-umbrella-and-straw-isolate-on-transparent-background-png.png"} alt={"bild"}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link href="/favorites">Favorites</Nav.Link>
                        <Nav.Link href="/Wheel">Spin the Wheel</Nav.Link>
                        <Nav.Link href="#" onClick={(e) => {
                            e.preventDefault();
                            getRandom();
                        }}>Random</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
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
                                    width: 'auto',
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
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadio" id="flexRadioDefault1" value="drink" checked={searchType === "drink"}
                               onChange={(e) => setSearchType(e.target.value)}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Drink
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadio" id="flexRadioDefault2" value="ingredient" checked={searchType === "ingredient"}
                               onChange={(e) => setSearchType(e.target.value)}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Ingredent
                        </label>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;