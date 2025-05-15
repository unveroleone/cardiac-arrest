function EndTurn({ setPlayersTurn }: any) {
    return (
      <button className="end-turn" onClick={() => setPlayersTurn(false)}>
        End Turn
      </button>
    );
  }
  
  export default EndTurn;
  