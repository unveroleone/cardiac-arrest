import "../assets/Cards.css"

type CardProps = {
    cardName: string;
    cardCost: number;
    cardDescription: string;
    onClick: () => void;
};

function Card({cardName, cardCost, cardDescription, onClick}: CardProps) {
    return (
        <div className="card-wrapper">
            <div className="mana-crystal">{cardCost}</div>
            <div className="card" onClick={onClick}>
                <div className="header">
                    <h1>{cardName}</h1>
                </div>
                <div className="card-image">
                    <img src={`/media/${cardName}.svg`} alt={cardName} />
                </div>
                <div className="card-description">
                    <p>{cardDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
