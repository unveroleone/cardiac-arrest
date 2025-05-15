import { useState, Dispatch, SetStateAction } from 'react';

import BattleInterface from './BattleInterface/BattleInterface';
import MapInterface from './UI/MapInterface';
import StartMenu from './UI/StartMenu';
import CreditsPage from './UI/CreditsPage';
import VictoryScreen from './UI/VictoryScreen';
import LoseScreen from './UI/LoseScreen';
import EnemyTurn from './BattleInterface/EnemyTurn';
import VictoryScreenFinal from './UI/VictoryScreenFinal';

import { Cards, createStartingDeck } from './cards';

function shuffleArray(array: Cards[]): Cards[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  //App states
  const [screen, setScreen] = useState<"start" | "map" | "battle" | "credits" | "victory" | "lost" | "victoryFinal">("start");

  // Battle states
  const [playerHealth, setPlayerHealth] = useState<number>(100);
  const [playerShield, setPlayerShield] = useState<number>(0);
  const [enemyHealth, setEnemyHealth] = useState<number>(100);
  const [energy, setEnergy] = useState<number>(3);
  const [hand, setHand] = useState<Cards[]>([]);
  const [deck, setDeck] = useState<Cards[]>(createStartingDeck());
  const [discardPile, setDiscardPile] = useState<Cards[]>([]);
  const [playersTurn, setPlayersTurn] = useState<boolean>(true);
  const [enemyDamage, setEnemyDamage] = useState<number>(0);
  const [buffAmount, setBuffAmount] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [buffActive, setBuffActive] = useState<boolean>(false);
  const [buffDuration, setBuffDuration] = useState<number>(0);
  const [clickablePoints, setClickablePoints] = useState({
    boss: false,
    enemy1: true,
    enemy2: false,
    enemy3: false
  });
  const [decision, setDecision] = useState<number>(0);
  const [enemyStatus, setEnemyStatus] = useState<string>("");
  const [enemyBuffDuration, setEnemyBuffDuration] = useState<number>(0);
  const [enemyHealthMax, setEnemyHealthMax] = useState<number>(0);
  const [currentEnemy, setCurrentEnemy] = useState<number>(0);
  const [wins, setWins] = useState<number>(0);
  
  function handleStartBattle() {
    setDeck(prevDeck => shuffleArray([...prevDeck]));
    setHand([]);
    setDiscardPile([]);
    setScreen("battle");
  }

  return (
    <>

      {/* Start Menu */}
      {screen === "start" && (
        <StartMenu
          onStartGame={() => setScreen("map")}
          onCredits={() => setScreen("credits")}
        />
      )}

      {screen === "map" && (
        <MapInterface onEnemyClick={handleStartBattle} clickablePoints={clickablePoints} setClickablePoints={setClickablePoints} />
      )}

      {screen === "battle" && (
        <BattleInterface
          decision={decision}
          setDecision={setDecision}
          ememyHealthMax={enemyHealthMax}
          setEnemyHealthMax={setEnemyHealthMax}
          shuffleArray={shuffleArray}
          clickablePoints={clickablePoints}
          setClickablePoints={setClickablePoints}
          setScreen={setScreen}
          playerHealth={playerHealth}
          setPlayerHealth={setPlayerHealth}
          playerShield={playerShield}
          setPlayerShield={setPlayerShield}
          enemyHealth={enemyHealth}
          setEnemyHealth={setEnemyHealth}
          energy={energy}
          setEnergy={setEnergy}
          hand={hand}
          setHand={setHand}
          deck={deck}
          setDeck={setDeck}
          discardPile={discardPile}
          setDiscardPile={setDiscardPile}
          playersTurn={playersTurn}
          setPlayersTurn={setPlayersTurn}
          enemyDamage={enemyDamage}
          setEnemyDamage={setEnemyDamage}
          buffAmount={buffAmount}
          setBuffAmount={setBuffAmount}
          status={status}
          setStatus={setStatus}
          buffActive={buffActive}
          setBuffActive={setBuffActive}
          buffDuration={buffDuration}
          setBuffDuration={setBuffDuration}
          wins={wins}
          setWins={setWins}
          enemyStatus={enemyStatus}
          setEnemyStatus={setEnemyStatus}
          enemyBuffDuration={enemyBuffDuration}
          setEnemyBuffDuration={setEnemyBuffDuration}
        />
      )}

      {screen === "credits" && <CreditsPage onMenu={() => setScreen("start")} />}

      {screen === "victory" && (
        <VictoryScreen setDeck={setDeck} setScreen={setScreen} goToMap={() => setScreen("map")} />
      )}

      {screen === "victoryFinal" && (
        <VictoryScreenFinal setScreen={setScreen} goToMap={() => setScreen("start")} />
      )}

      {screen === "lost" && (
        <LoseScreen onStartGame={() => setScreen("map")} />
      )}
    </>
  );
}

export default App;
