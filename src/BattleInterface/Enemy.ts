// Enemy stats: maxHealth, baseDamage, buffMultiplier, healAmount
// Slime:       10,        10,         0.5,           5
// Goblin:      20,        20,         0.3,           5
// Ogre:        30,        30,         0.7,           8
// Final Boss:  50,        50,         1.0,           10

export class Enemy {
  attack: number;
  health: number;
  maxHealth: number;
  buffMultiplier: number;
  buffDurationDefault: number;
  buffTurnsLeft: number = 0;
  enemyAttacks: string[];
  enemyPicturePath: string;
  healAmount: number;
  actionRarity: Record<string, number>;

  constructor(
    attack: number,
    health: number,
    buffMultiplier: number = 0.5,
    buffDuration: number = 2,
    enemyAttacks: string[] = [],
    enemyPicturePath: string = "",
    healAmount: number = 5,
    actionRarity: Record<string, number> = { damage: 100 }
  ) {
    this.attack = attack;
    this.health = health;
    this.maxHealth = health;
    this.buffMultiplier = buffMultiplier;
    this.buffDurationDefault = buffDuration;
    this.enemyAttacks = enemyAttacks;
    this.enemyPicturePath = enemyPicturePath;
    this.healAmount = healAmount;
    this.actionRarity = actionRarity;
  }

  get attackArray(): string[] {
    const actions: string[] = [];
    for (const [action, weight] of Object.entries(this.actionRarity)) {
      for (let i = 0; i < weight; i++) {
        actions.push(action);
      }
    }
    return actions;
  }

  get damage(): number {
    return this.hasBuff() ? this.attack * (1 + this.buffMultiplier) : this.attack;
  }

  get enemyHealth(): number {
    return this.health;
  }

  hasBuff(): boolean {
    return this.buffTurnsLeft > 0;
  }

  applyBuff() {
    this.buffTurnsLeft += this.buffDurationDefault;
  }

  reduceBuff() {
    if (this.buffTurnsLeft > 0) this.buffTurnsLeft--;
  }

  heal() {
    this.health = Math.min(this.health + this.healAmount, this.maxHealth);
  }

  reset() {
    this.buffTurnsLeft = 0;
    this.health = this.maxHealth;
  }
}

export const enemys: Enemy[] = [
  new Enemy(
    10,
    30,
    0.3,
    2,
    ["damage", "buff", "heal"],
    "slime.jpg",
    5,
    { damage: 70, buff: 30 }
  ),
  new Enemy(
    25,
    50,
    0.3,
    3,
    ["damage", "buff", "heal"],
    "Goblin.jpg",
    5,
    { damage: 70, buff: 30 }
  ),
  new Enemy(
    30,
    100,
    0.3,
    1,
    ["damage", "buff"],
    "org.png",
    8,
    { damage: 70, buff: 30 }
  ),
  new Enemy(
    50,
    150,
    0.3,
    3,
    ["damage", "buff", "heal"],
    "final-boss.png",
    10,
    { damage: 60, buff: 15, heal: 25 }
  )
];

export function initializeEnemy(
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>,
  setEnemyDamage: React.Dispatch<React.SetStateAction<number>>,
  index: number,
  setMaxEnemyHealth: React.Dispatch<React.SetStateAction<number>>,
  setEnemyStatus: React.Dispatch<React.SetStateAction<string>>,
  setEnemyBuffDuration: React.Dispatch<React.SetStateAction<number>>
) {
  const enemy = enemys[index];
  enemy.reset();
  setEnemyHealth(enemy.enemyHealth);
  setEnemyDamage(enemy.damage);
  setMaxEnemyHealth(enemy.maxHealth);
  setEnemyStatus("");
  setEnemyBuffDuration(0);
}

type HandleAttackProps = {
  playerHealth: number;
  setPlayerHealth: React.Dispatch<React.SetStateAction<number>>;
  setEnergy: React.Dispatch<React.SetStateAction<number>>;
  setPlayersTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerShield: React.Dispatch<React.SetStateAction<number>>;
  playerShield: number;
  setEnemyDamage: React.Dispatch<React.SetStateAction<number>>;
  decision: number;
  setDecision: React.Dispatch<React.SetStateAction<number>>;
  setEnemyStatus: React.Dispatch<React.SetStateAction<string>>;
  setEnemyBuffDuration: React.Dispatch<React.SetStateAction<number>>;
  currentEnemyIndex: number;
  setEnemyHealth: React.Dispatch<React.SetStateAction<number>>;
};

export function handleAttack({
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
}: HandleAttackProps) {
  const currentEnemy = enemys[currentEnemyIndex];

  const enemyActions: Record<string, () => void> = {
    enemy_damage() {
      const enemyDamage = currentEnemy.damage;
      const finalDamage = Math.max(0, enemyDamage - playerShield);

      if (playerShield >= enemyDamage) {
        setPlayerShield(playerShield - enemyDamage);
      } else {
        setPlayerShield(0);
        setPlayerHealth(prev => prev - finalDamage);
      }
    },
    enemy_buff() {
      currentEnemy.applyBuff();
      setEnemyDamage(currentEnemy.damage);
    },
    enemy_heal() {
      currentEnemy.heal();
      setEnemyHealth(currentEnemy.health);
    }
  };

  const attackList = currentEnemy.attackArray;
  const stateName = attackList[decision % attackList.length];
  const functionName = `enemy_${stateName}`;

  if (enemyActions[functionName]) {
    enemyActions[functionName]();
  } else {
    console.warn(`Unknown attack: ${functionName}`);
  }

  setEnemyBuffDuration(currentEnemy.buffTurnsLeft);
  setEnemyStatus(currentEnemy.hasBuff() ? "↑ " : "");
  setEnergy(3);
  setPlayersTurn(true);
  setEnemyDamage(currentEnemy.damage);
  currentEnemy.reduceBuff();
}
