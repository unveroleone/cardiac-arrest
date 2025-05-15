import '../assets/VictoryScreen.css';
import { Dispatch, SetStateAction } from "react";

type VictoryScreenProps = {
    setScreen: Dispatch<SetStateAction<any>>;
    goToMap: () => void;
};

function VictoryScreenFinal({ goToMap: onStartGame }: VictoryScreenProps){
    return (
        <div className="victory-screen">
            <div className="victory-message">
                <div className="logo">
                    <img src="/media/Victory.png" alt="Victory" />
                </div>
                <p>You have defeated the boss and won the game!</p>
            </div>
            <button onClick={onStartGame}>Home</button>
        </div>
    );
}

export default VictoryScreenFinal;