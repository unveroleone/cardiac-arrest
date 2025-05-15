import HealthBar from "./HealthBar";
import '../assets/BattleInterface.css';

type EnemyHealthProps = {
  enemyHealth: number;
  enemyDamage: number;
  maxEnemyHealth: number;
  decision: number;
  enemyMoveIndex: number;
  enemyBuffDuration: number;
  enemyStatus: string;
  enemys: any[]
};

function EnemyStats({enemyHealth, enemyDamage, maxEnemyHealth, decision, enemyMoveIndex, enemyBuffDuration, enemyStatus, enemys}: EnemyHealthProps) { 

  <div className="enemy-health">
</div>

  let finalStatus : string = `${enemyStatus} ${enemyBuffDuration}`
  
  return (
    <div className="enemy">
      <div className="enemy-image-wrapper">
        <img
          src={`./media/enemys/${enemys[enemyMoveIndex].enemyPicturePath}`}
          alt={`Enemy ${enemyMoveIndex}`}
          className="enemy-image"
        />
      </div>
  
      <div className="enemy-info">
        <HealthBar current={enemyHealth} max={maxEnemyHealth} />
        <div className="enemy-health">damage: {enemyDamage}</div>
        <div className="enemy-health">
          nextMove: {enemys[enemyMoveIndex].attackArray[decision - 1]}
          {enemyBuffDuration > 0 && ` ${finalStatus} `}
        </div>
        <div className="enemy-controls"></div>
      </div>
    </div>
  );
  
}

export default EnemyStats;