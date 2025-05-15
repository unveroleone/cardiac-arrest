export enum CardType {
  Attack = "Attack",
  Buff = "Buff",
  Shield = "Shield",
  Vulnerable = "Vulnerable",
  DrawCard = "DrawCard",
  Energy = "Energy"
};

type CardEffect = {
  attack?: (enemyHealth: number, buff: number, playerShield: number, 
            buffDuration: number) => number;
  shield?: (playerShield: number) => number;
  buff?: () => number;
  energy?: (buffDuration: number) => number;
  draw?: (buffDuration: number) => number;
};

class Cards {
  name: string;
  cost: number;
  description: string;
  types: CardType[];
  effect: CardEffect;

  constructor(
    name: string,
    cost: number,
    description: string,
    types: CardType[],
    effect: CardEffect
  ) {
    this.name = name;
    this.cost = cost;
    this.description = description;
    this.effect = effect;
    this.types = types;
  }

  clone(): Cards {
    return new Cards(this.name, this.cost, this.description, [...this.types], { ...this.effect });
  }  
}

//Creating new cards objects, to not encounter reference problems
// for (let i = 0; i < 5; i++)
// {
//   //Inserting 5 strikes and 4 defends
//   startingCards.push(new Cards(
//     "Strike",
//     1,
//     "Deal 6 damage",
//     [CardType.Attack],
//     {
//       attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(6 + 6 * buffAmount)
//     }
//   ));

//   if (i < 4) {
//     startingCards.push(new Cards(
//       "Defend",
//       1,
//       "Gain 5 shield",
//       [CardType.Shield],
//       {
//         shield: (playerShield) => playerShield + 5
//       }
//     ));
//   } 
// }

//Inserting one buff
// startingCards.push(new Cards(
//   "Buff",
//   2,
//   "Deal 8 damage and gain 2 strength",
//   [CardType.Attack, CardType.Buff],
//   {
//     attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(8 + 8 * buffAmount),
//     buff: () => 0.5
//   }
// ));

//Whole collection of cards to find
const cards: Cards[] = [
  new Cards(
    "Strike",
    1,
    "Deal 6 damage",
    [CardType.Attack],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(6 + 6 * buffAmount)
    }
  ),

  new Cards(
    "Defend",
    1,
    "Gain 5 shield",
    [CardType.Shield],
    {
      shield: (playerShield) => playerShield + 5
    }
  ),

  new Cards(
    "Buff",
    2,
    "Deal 8 damage, gain 2 strength",
    [CardType.Attack, CardType.Buff],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(8 + 8 * buffAmount),
      buff: () => 0.5
    }
  ),

  new Cards(
    "Strike & Defend",
    1,
    "Deal 5 damage, gain 5 shield",
    [CardType.Attack, CardType.Shield],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(5 + 5 * buffAmount),
      shield: (playerShield) => playerShield + 5
    }
  ),

  new Cards(
    "Quick Draw",
    0,
    "Draw 1 card, gain 1 energy",
    [CardType.DrawCard, CardType.Energy],
    {
      energy: () => 1,
      draw: () => 1
    }
  ),

  new Cards(
    "Shield Up",
    1,
    "Gain 8 shield, draw 1 card",
    [CardType.Shield, CardType.DrawCard],
    {
      shield: (playerShield) => playerShield + 8,
      draw: () => 1
    }
  ),

  new Cards(
    "Invincible",
    2,
    "Gain 30 shield",
    [CardType.Shield],
    {
      shield: (playerShield) => playerShield + 30
    }
  ),

  new Cards(
    "Double Up",
    1,
    "Double your shield",
    [CardType.Shield],
    {
      shield: (playerShield) => playerShield * 2
    }
  ),

  new Cards(
    "Shield Slam",
    1,
    "Deal damage equal to shield",
    [CardType.Attack],
    {
      attack: (enemyHealth, buffAmount, playerShield) => 
        enemyHealth - Math.ceil(playerShield + playerShield * buffAmount)
    }
  ),

  new Cards(
    "Heavy Blade",
    2,
    "Deal 14 damage +50% strength",
    [CardType.Attack],
    {
      attack: (enemyHealth, buffAmount, playerShield, buffDuration) => 
        enemyHealth - Math.ceil(14 + 14 * (buffAmount + 0.5 * buffDuration))
    }
  ),

  new Cards(
    "Efficient Strike",
    1,
    "Deal 9 damage, draw 1 card",
    [CardType.Attack, CardType.DrawCard],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(9 + 9 * buffAmount),
      draw: () => 1
    }
  ),

  new Cards(
    "Energy Boost",
    0,
    "Gain 2 energy",
    [CardType.Energy],
    {
      energy: () => 2
    }
  ),

  new Cards(
    "Burning Draw",
    1,
    "Draw 2 cards",
    [CardType.DrawCard],
    {
      draw: () => 2
    }
  ),

  new Cards(
    "Destruction",
    2,
    "Deal 20 damage",
    [CardType.Attack],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(20 + 20 * buffAmount)
    }
  ),

  new Cards(
    "Dropkick",
    1,
    "Deal 5 damage, if strength +1 energy, +1 card",
    [CardType.Attack, CardType.Energy, CardType.DrawCard],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(5 + 5 * buffAmount),
      energy: (buffDuration) => {
        if (buffDuration > 0) {
          return 1;
        }
        return 0;
      },
      draw: (buffDuration) => {
        if (buffDuration > 0) {
          return 1;
        }
        return 0;
      }
    }
  ),

  new Cards(
    "Strength",
    1,
    "Gain 2 strength",
    [CardType.Buff],
    {
      buff: () => 0.5
    }
  ),

  new Cards(
    "Annhilation",
    3,
    "Deal 27 damage",
    [CardType.Attack],
    {
      attack: (enemyHealth, buffAmount) => enemyHealth - Math.ceil(27 + 27 * buffAmount)
    }
  )
];

function createStartingDeck()
{
  //Creating the starting cards
  const startingCards: Cards[] = [];

  for (let i = 0; i < 15; i++) {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    startingCards.push(randomCard.clone());
  }

  return startingCards;
}

export { cards, createStartingDeck, Cards };
