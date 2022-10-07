const Player = ({card, stack}) => {
    return card.image ?  ( 
        <div>
            <p>Your stack: {stack}</p>
            <img src={card.image} alt='card'></img>
        </div>
    ) : (<p>Your stack: {stack}</p>)
}

export default Player;