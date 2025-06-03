import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Wheel } from 'react-custom-roulette'
import "./SpinningWheel.css"

function SpinningWheel({ favoriteDrinks = [], setDrink }) {
    const [mustSpin, setMustSpin] = useState(false)
    const [prizeNumber, setPrizeNumber] = useState(0)
    const [backGroundColors, setBackGroundColors] = useState([]);

    const data = favoriteDrinks.map(drink => ({ option: drink.strDrink }))

    const winner = () => {
        if (data.length === 0) return
        const randomIndex = Math.floor(Math.random() * data.length)
        setPrizeNumber(randomIndex)
        setMustSpin(true)
    }

    const generateRandomColor = () => {
        const letters = "23456789ABCDEF"
        let color = "#"
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 14)]
        }
        return color
    }

    useEffect(() => {
        setBackGroundColors(favoriteDrinks.map(() => (generateRandomColor())));
    }, [favoriteDrinks]);

    return (
        <>
            {data.length > 0 ? (
                <div id="wheel-field" className="mt-3">
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={data}
                        backgroundColors={backGroundColors}
                        textColors={['#000000']}
                        onStopSpinning={() => {
                            setMustSpin(false)
                            setDrink(favoriteDrinks[prizeNumber])
                        }}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        <Button onClick={winner} disabled={mustSpin}>Snurra hjulet!</Button>
                    </div>
                </div>
            ) : (
                <p>🚫 Inga favoriter tillgängliga för snurrning.</p>
            )}
        </>
    )
}

export default SpinningWheel
