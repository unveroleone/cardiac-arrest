import { cards, Cards } from '../cards';
import Card from '../BattleInterface/Card';
import '../assets/VictoryScreen.css'
import { Dispatch, SetStateAction } from "react";

type VictoryScreenProps = {
    setDeck: Dispatch<SetStateAction<Cards[]>>;
    setScreen: Dispatch<SetStateAction<any>>;
    goToMap: () => void;
};

function VictoryScreen({ setDeck, setScreen, goToMap: onStartGame }: VictoryScreenProps){
    function getRandomCards() {
        const randomCards: Cards[] = [];
        for (let i = 0; i < 3; i++) {
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            randomCards.push(randomCard.clone());
        }
          
        return randomCards;
    }

    function addToDeck(card: Cards) {
        setDeck(prevDeck => [...prevDeck, card]);
        setScreen("map");
    }

    return (
        <div className="victory-screen">
            <div className="victory-message">
                <div className="logo">
                    <img src="/media/Victory.png" alt="Victory" />
                </div>
                <p>You have defeated the enemy!</p>
            </div>
            <div className="card-selection">
                <h2>Select a card to add to your deck:</h2>
                <div className="card-container">
                    {getRandomCards().map((card, i) => (
                        <Card
                        key={card.name + i}
                        cardName={card.name}
                        cardCost={card.cost}
                        cardDescription={card.description}
                        onClick={() => {addToDeck(card)}}
                      />
                    ))}
                </div>
            </div>
            <button onClick={onStartGame}>Skip</button>
        </div>
    );
}

export default VictoryScreen;
