import Card from './Card';
import { Cards, CardType } from '../cards';

type PlayerHandProps = {
    setHand: React.Dispatch<React.SetStateAction<Cards[]>>;
    setEnemyHealth: React.Dispatch<React.SetStateAction<number>>;
    setEnergy: React.Dispatch<React.SetStateAction<number>>;
    setPlayerShield: React.Dispatch<React.SetStateAction<number>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    discardCard: (arg0: Cards) => void; 
    drawCards: (amount: number, append?: boolean) => void;
    energy: number;
    buffAmount:number;
    playerShield: number;
    enemyHealth: number;
    hand: Cards[];
    buffs: (number| boolean)[];
    buffActive: boolean;
    setBuffActive: React.Dispatch<React.SetStateAction<boolean>>;
    buffDuration: number;
    setBuffDuration: React.Dispatch<React.SetStateAction<number>>;
    setBuffAmount: React.Dispatch<React.SetStateAction<number>>;
};

function PlayerHand({
    setPlayerShield,
    setEnemyHealth,
    setEnergy,
    setHand,
    setStatus,
    discardCard,
    drawCards,
    buffAmount,
    playerShield,
    enemyHealth,
    energy,
    hand,
    buffActive,
    setBuffActive,
    buffDuration,
    setBuffDuration,
    setBuffAmount
}: PlayerHandProps)
{   
  function playCard(card: Cards) {
    if (energy >= card.cost) {
      setEnergy(prev => prev - card.cost);

      if (card.types.includes(CardType.Attack) && card.effect.attack) {
        setEnemyHealth(card.effect.attack(enemyHealth, buffAmount, playerShield, buffDuration));
      }
  
      if (card.types.includes(CardType.Shield) && card.effect.shield) {
        setPlayerShield(prev => card.effect.shield!(prev));
      }

      if (card.types.includes(CardType.Buff) && card.effect.buff) {
        const newDuration = buffDuration + 2;
        if (!buffActive) {
          setBuffAmount(card.effect.buff());
        }
        setBuffActive(true);
        setBuffDuration(newDuration);
        setStatus("↑ " + newDuration);
      }

      if (card.types.includes(CardType.Energy) && card.effect.energy) {
        setEnergy(prev => prev + card.effect.energy!(buffDuration));
      }

      if (card.types.includes(CardType.DrawCard) && card.effect.draw) {
        drawCards(card.effect.draw(buffDuration), true);
      }

      discardCard(card);
    }
  }

    return (
        <div id="hand-area">
          {//Iterating through the hand to create the cards components
            hand.map((card, i) => (
            <Card
              key={card.name + i}
              cardName={card.name}
              cardCost={card.cost}
              cardDescription={card.description}
              onClick={() => playCard(card)}
            />
          ))}
        </div>
      );
}

export default PlayerHand;
