import '../assets/StartMenu.css';


function StartMenu({ onStartGame, onCredits }: { onStartGame: () => void; onCredits: () => void }) {
  return (
    <div className="start-menu">
      <div className="logo">
        <img src="/media/Titel-CardiacArrest.png" alt="Cardiac Arrest Logo" />
      </div>
      <div className="content">
        <p>Select an option to get started:</p>
        <div className="buttons">
          <button onClick={onStartGame}>Start Game</button>
          <button onClick={onCredits}>Credits</button>
          <button onClick={() => window.open('https://buymeacoffee.com/lunavius', '_blank')}>
            Donate
          </button>

        </div>
      </div>
    </div>
  );
}

export default StartMenu;
