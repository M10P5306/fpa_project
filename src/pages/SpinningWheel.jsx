import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'

function SpinningWheel({ favoriteDrinks = [], setDrink }) {
    const [mustSpin, setMustSpin] = useState(false)
    const [prizeNumber, setPrizeNumber] = useState(0)

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

    const backGroundColors = favoriteDrinks.map(() => (generateRandomColor()))

    return (
        <>
            {data.length > 0 ? (
                <>
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
                    <button onClick={winner} disabled={mustSpin} style={{ marginTop: 20 }}>
                        Snurra hjulet!
                    </button>
                </>
            ) : (
                <p>🚫 Inga favoriter tillgängliga för snurrning.</p>
            )}
        </>
    )
}

export default SpinningWheel
