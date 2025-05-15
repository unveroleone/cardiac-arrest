import '../assets/CreditsPage.css';

function CreditsPage({ onMenu } : { onMenu: () => void }) {
  return (
    <div className="credits">
      <h1>Credits:</h1>
      <p><a target="_blank" href='https://github.com/loris007boom'>Loris</a></p>
      <p><a target="_blank" href='https://github.com/unveroleone'>Leonardo</a></p>
      <p><a target="_blank" href="https://github.com/MinoC5">Mischa</a></p>
      <p><a target="_blank" href='https://github.com/Lunavius'>Ramon</a></p>
      <button onClick={onMenu}> Back </button>
    </div>
  );
}

export default CreditsPage;