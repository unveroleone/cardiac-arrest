type HealthBarProps = {
    current: number;
    max: number;
  };
  
  function HealthBar({ current, max }: HealthBarProps) {
    const healthPercent = (current / max) * 100;
    
    let textcolor = 'white';
    let color = 'green';
    if (healthPercent <= 30) color = 'red';
    else if (healthPercent <= 60) {
      color = 'yellow';
      textcolor = 'black';
    }
  
    return (
      <div className="health-bar-container">
        <div 
          className="health-bar-fill" 
          style={{ 
            width: `${healthPercent}%`,
            backgroundColor: color
          }}
        />
        <span style={{ color: textcolor }} className="health-bar-text">{current} / {max}</span>
      </div>
    );
  }
  
  export default HealthBar;
  