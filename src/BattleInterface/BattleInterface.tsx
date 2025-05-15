import "../assets/BattleInterface.css";
import PlayerStats from './PlayerStats';
import EnemyStats from './EnemyStats';
import Deck from './Deck';
import PlayerEnergy from "./PlayerEnergy";
import EndTurn from "./EndTurn";
import DiscardPile from "./DiscardPile";
import PlayerHand from "./PlayerHand";
import { Cards, createStartingDeck } from "../cards";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { enemys, handleAttack, initializeEnemy } from "./Enemy";

type ClickablePoints = {
  boss: boolean;
  enemy1: boolean;
  enemy2: boolean;
  enemy3: boolean;
};

type BattleInterfaceProps = {
  shuffleArray: (array: Cards[]) => Cards[];
  setScreen: Dispatch<SetStateAction<"start" | "map" | "battle" | "credits" | "victory" | "lost" | "victoryFinal">>;
  playerHealth: number;
  setPlayerHealth: Dispatch<SetStateAction<number>>;
  playerShield: number;
  setPlayerShield: Dispatch<SetStateAction<number>>;
  enemyHealth: number;
  setEnemyHealth: Dispatch<SetStateAction<number>>;
  energy: number;
  setEnergy: Dispatch<SetStateAction<number>>;
  hand: Cards[];
  setHand: Dispatch<SetStateAction<Cards[]>>;
  deck: Cards[];
  setDeck: Dispatch<SetStateAction<Cards[]>>;
  discardPile: Cards[];
  setDiscardPile: Dispatch<SetStateAction<Cards[]>>;
  playersTurn: boolean;
  setPlayersTurn: Dispatch<SetStateAction<boolean>>;
  enemyDamage: number;
  setEnemyDamage: Dispatch<SetStateAction<number>>;
  buffAmount: number;
  setBuffAmount: Dispatch<SetStateAction<number>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  buffActive: boolean;
  setBuffActive: Dispatch<SetStateAction<boolean>>;
  buffDuration: number;
  setBuffDuration: Dispatch<SetStateAction<number>>;
  clickablePoints: ClickablePoints;
  setClickablePoints: Dispatch<SetStateAction<ClickablePoints>>;
  wins: number;
  setWins: Dispatch<SetStateAction<number>>;
  ememyHealthMax: number;
  setEnemyHealthMax: Dispatch<SetStateAction<number>>;
  decision: number;
  setDecision: Dispatch<SetStateAction<number>>;
  enemyStatus: string;
  setEnemyStatus: Dispatch<SetStateAction<string>>;
  enemyBuffDuration: number;
  setEnemyBuffDuration: Dispatch<SetStateAction<number>>;
};

function BattleInterface({
  enemyStatus,
  setEnemyStatus,
  enemyBuffDuration,
  setEnemyBuffDuration,
  ememyHealthMax,
  setEnemyHealthMax,
  shuffleArray,
  clickablePoints,
  setClickablePoints,
  setScreen,
  playerHealth,
  setPlayerHealth,
  playerShield,
  setPlayerShield,
  enemyHealth,
  setEnemyHealth,
  energy,
  setEnergy,
  hand,
  setHand,
  deck,
  setDeck,
  discardPile,
  setDiscardPile,
  playersTurn,
  setPlayersTurn,
  enemyDamage,
  setEnemyDamage,
  buffAmount,
  setBuffAmount,
  status,
  setStatus,
  buffActive,
  setBuffActive,
  buffDuration,
  setBuffDuration,
  wins,
  setWins,
  decision,
  setDecision,
}: BattleInterfaceProps) {
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(wins);

  function drawCards(amount: number, append: boolean = false) {
    let newDeck = [...deck];
    let newDiscardPile = [...discardPile];
    const drawnCards: Cards[] = [];
  
    for (let i = 0; i < amount; i++) {
      if (newDeck.length === 0 && newDiscardPile.length > 0) {
        newDeck = shuffleArray([...newDiscardPile]);
        newDiscardPile = [];
      }
      if (newDeck.length > 0) {
        drawnCards.push(newDeck.pop()!);
      }
    }

    setDeck(newDeck);
    setDiscardPile(newDiscardPile);

    // Append or replace hand
    setHand((prev) => append ? [...prev, ...drawnCards] : drawnCards);
  }

  //Discarding not by index, but the Cards instance
  function discardCard(card: Cards) {
    setHand((prevHand) => prevHand.filter((c) => c !== card));
    setDiscardPile((prev) => [...prev, card]);
  }

  function resetDeck(deck: Cards[], discard: Cards[], hand: Cards[]) {
    const allCards = [...deck, ...discard, ...hand];
    return shuffleArray(allCards);
  }

  // On battle start
  useEffect(() => {
    console.log("Battle started!");
    setBuffDuration(0);
    setBuffAmount(0);
    setStatus("");
    setDeck((d) => shuffleArray([...d]));
    setDecision(Math.floor(Math.random() * enemys[currentEnemyIndex].attackArray.length) + 1);
    setPlayerShield(0);
    setEnergy(3);
    initializeEnemy(
      setEnemyHealth,
      setEnemyDamage,
      currentEnemyIndex,
      setEnemyHealthMax,
      setEnemyStatus,  
      setEnemyBuffDuration
    );
  }, []);

  // Turn change
  useEffect(() => {
    if (!playersTurn) {
      setDiscardPile([...discardPile, ...hand]);
      setHand([]);
      setDecision(Math.floor(Math.random() * enemys[currentEnemyIndex].attackArray.length) + 1);

      setTimeout(() => {
        handleAttack({
          playerHealth,
          setPlayerHealth,
          setEnergy,
          setPlayersTurn,
          setPlayerShield,
          playerShield,
          setEnemyDamage,
          setDecision,
          decision,
          setEnemyStatus,
          setEnemyBuffDuration,
          currentEnemyIndex,
          setEnemyHealth
        });
      }, 1000);
    } else {
      setPlayerShield(0);
      drawCards(5);

      if (buffActive) {
        const newDuration = buffDuration - 1;
        setBuffDuration(newDuration);

        if (newDuration <= 0) {
          setBuffActive(false);
          setBuffAmount(0);
          setBuffDuration(0);
          setStatus("");
          setBuffActive(false);
        } else if (buffDuration > 0) {
          setStatus("↑ " + newDuration);
        }
      }
    }
  }, [playersTurn]);

  // Win conditions
  useEffect(() => {
    if (enemyHealth <= 0 || playerHealth <= 0) {
      const fullDeck = resetDeck(deck, discardPile, hand);
      setDeck(fullDeck);
      setHand([]);
      setDiscardPile([]);
      if (enemyHealth <= 0) {
        setWins(prev => prev + 1);
        setTimeout(() => setScreen("victory"), 0);
        initializeEnemy(setEnemyHealth, setEnemyDamage, currentEnemyIndex, setEnemyHealthMax, setEnemyStatus, setEnemyBuffDuration);
        onEndGame();
      }
      if (playerHealth <= 0) {
        setWins(0);
        setDeck(createStartingDeck());
        setClickablePoints({
          enemy1: true,
          enemy2: false,
          enemy3: false,
          boss: false,
        });
        setTimeout(() => setScreen("lost"), 0);
        setPlayerHealth(100);
        onEndGame();
      }
    }
  }, [enemyHealth, playerHealth]);

  function onEndGame() {
    setBuffAmount(0);
    setBuffDuration(0);
    setStatus("");
    setBuffActive(false);
  }

  useEffect(() => {
    if (wins === 1) {
      setClickablePoints((prev) => ({ ...prev, enemy2: true, enemy1: false }));
    }
    if (wins === 2) {
      setClickablePoints((prev) => ({ ...prev, enemy3: true, enemy2: false }));
    }
    if (wins === 3) {
      setClickablePoints((prev) => ({ ...prev, boss: true, enemy3: false }));
    }
    if (wins === 4) {
      setScreen("victoryFinal");
    }
  }, [wins]);

  return(
    <div id="game">
      <div id="fighting-area">
        <PlayerStats playerHealth={playerHealth} playerShield={playerShield} status={status} />
        <EnemyStats enemyHealth={enemyHealth} enemyDamage={enemyDamage} maxEnemyHealth={ememyHealthMax} decision={decision} enemyMoveIndex={currentEnemyIndex} enemys={enemys} enemyBuffDuration={enemyBuffDuration} enemyStatus={enemyStatus} />
      </div>

      <div className="Player-Image">
        <img src={`./media/Player.png`} alt="Player" className="player-image" />
      </div>

      <div id="hand-area-wrapper">
        <Deck deck={deck} />
        <PlayerEnergy energy={energy} />

        <PlayerHand
          buffAmount={buffAmount}
          enemyHealth={enemyHealth}
          setEnemyHealth={setEnemyHealth}
          energy={energy}
          setEnergy={setEnergy}
          hand={hand}
          setHand={setHand}
          playerShield={playerShield}
          setPlayerShield={setPlayerShield}
          setStatus={setStatus}
          discardCard={discardCard}
          drawCards={drawCards}
          buffActive={buffActive}
          setBuffActive={setBuffActive}
          buffDuration={buffDuration}
          setBuffDuration={setBuffDuration}
          setBuffAmount={setBuffAmount}
          buffs={[buffActive, buffDuration, buffAmount]}
        />

        <EndTurn setPlayersTurn={setPlayersTurn} />
        <DiscardPile discardPile={discardPile} />
      </div>
    </div>
  );
}

export default BattleInterface;
