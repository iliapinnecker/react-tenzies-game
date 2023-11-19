import Die from "./Die"
import RollCounter from "./RollCounter"
import PreviousRollCount from "./previousRollCount"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
/**
 * Tenzi game with all functions.
 * @returns App component
 */
function App() {

    const [count, setCount] = React.useState(0)
    const [prevCount, setPrevCount] = React.useState("")
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    /**
     * Checks if all dice are held and have the same value,
     * if so set game to win state.
     */
    React.useEffect(function() {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    /**
     * Generates a random die with value 1-6, unique ID, isHeld boolean.
     * @returns new random die component
     */
    function generateNewDie() {
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid()
        }
    }

    /**
     * Generates am array of 10 random dice with random values.
     * @returns an array of randomly generated dice
     */
    function allNewDice() {
        const randomNumbers = []

        for (let i = 0; i < 10; i++) {
            randomNumbers.push(generateNewDie())
        }
        return randomNumbers
    }

    /**
     * Holds the die, flipping its isHeld boolean.
     * @param {String} id flips isHeld on a specific die
     */
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    /**
     * Roll the dice except the ones which are held while game not over.
     * In other case set game state to new game and generate new dice array.
     */
    function rollDice() {
        if (!tenzies) {
            setCount(count + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
        }
        else {
            setTenzies(false)
            setDice(allNewDice())
            setPrevCount(count)
            setCount(0)
        }
    }

    /**
     * Instantiates 10 random dice components.
     */
    const diceElements = dice.map((item) => (
        <Die key={item.id} value={item.value} isHeld={item.isHeld} holdDice={() => holdDice(item.id)} />
    ))

    return (
        <div>
            {tenzies && <Confetti />}
            <main>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
                <div className="die-container">
                    {diceElements}
                </div>
                <button className="roll-btn" onClick={rollDice}>
                    {tenzies === true ? "New Game" : "Roll Dice"}
                </button>
                <RollCounter count={count} />
                <PreviousRollCount prevCount={prevCount}/>
            </main>
        </div>
    )
}

export default App
