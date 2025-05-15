import { Cards } from "../cards";
import '../assets/BattleInterface.css';

type DeckProps = {
    deck: Cards[];
};

function Deck({deck}: DeckProps) {
    function showDeckLength() {
        console.log([...deck].length);
    }

    return(
        <>
            <div className="deck" onClick={showDeckLength}>
                <img src="/media/deck.png" alt="Deck" />
            </div>
        </>
    )
}

export default Deck;
