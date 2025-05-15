import HealthBar from "./HealthBar";
import '../assets/BattleInterface.css';


type PlayerHealthProps = {
  playerHealth: number;
  playerShield: number;
  status: string;
};

function PlayerStats({playerHealth, playerShield, status}: PlayerHealthProps) {
  
    return (
    <div className='player'>
      <div className="health-bar-wrapper">
        <div className="health-bar-container">
          <img src="/media/heart.svg" alt="heart-icon" className="heart-in-bar" />
          <HealthBar current={playerHealth} max={100} />
        </div>
        <div className="shield-info">
          <span>{playerShield}</span>
          <img src="/media/shield-icon.svg" alt="shield-icon" className="shield-icon" />
        </div>
      </div>
      <div className="player-status">Status: {status}</div>
    </div>
    );
}

export default PlayerStats;