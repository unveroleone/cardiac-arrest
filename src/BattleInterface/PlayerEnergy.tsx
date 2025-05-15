type PlayerEnergyProps = {
    energy: number;
};

function PlayerEnergy({energy} : PlayerEnergyProps) {

    return(
        <div className='energy'>
            <img src="/media/blue.png" alt="energy" />
            <span className="energy-number">{energy}</span>
        </div>
    )
}

export default PlayerEnergy;