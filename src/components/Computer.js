const Computer = ({card, stack}) => {
    return card.image ?  ( 
        <div>
            <img src={card.image} alt='card'></img>
            <p>Your stack: {stack}</p>
        </div>
    ) : (
        <div>
    <p>Computer's stack: {stack}</p>
    </div>
    )
}

export default Computer;