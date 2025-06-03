import React, { useEffect, useState } from 'react'
import { Wheel } from 'react-custom-roulette'

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
            <div className="container mt-5">
                {data.length > 0 ? (
                    <div className="row justify-content-center text-center">
                        <div className="col-auto">
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
                            <button
                                className="btn btn-warning btn-lg mt-4"
                                onClick={winner}
                                disabled={mustSpin}
                            >
                                Snurra hjulet!
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center">🚫 Inga favoriter tillgängliga för snurrning.</p>
                )}
            </div>
    )
}

export default SpinningWheel
