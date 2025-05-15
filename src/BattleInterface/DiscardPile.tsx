import { Cards } from '../cards';

import '../assets/BattleInterface.css';
type DiscardPileProps = {
    discardPile: Cards[];
};

function DiscardPile({discardPile}: DiscardPileProps) {
    function showDiscardPileLength() {
        console.log([...discardPile].length);
    }

    return(
        <>
            <div className="discard-pile" onClick={showDiscardPileLength}>
                <img src="/media/discard.png" alt="discard" />
            </div>
        </>
    )
}

export default DiscardPile;
