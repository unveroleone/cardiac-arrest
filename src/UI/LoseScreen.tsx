import '../assets/LoseScreen.css';

function LoseScreen({onStartGame}: { onStartGame: () => void }){
    return (
        <div className="lose-screen">
            <div className="lose-message">
                <div className="logo">
                    <img src="/media/lost.png" alt="Lose" />
                </div>
                <p>You have been defeated!</p>
            </div>
            <button onClick={onStartGame}>Try Again</button>
        </div>
    )
}

export default LoseScreen;