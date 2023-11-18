/**
 * Die Element used in App.
 * @param {*} props Properties passed down from App
 * @returns Die Element with certain number und isHeld boolean
 */
export default function Die(props) {
    
    const styles= {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}
