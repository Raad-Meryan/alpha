import './ShinyText.css';

const ShinyText = ({ text, disabled = false, speed = 5, className = '', baseColor = '#000', highlightColor = 'rgba(255, 0, 0, 0.9)' }) => {
  const styleVars = {
    ['--shine-base-color']: baseColor,
    ['--shine-highlight-color']: highlightColor,
    ['--shine-duration']: `${speed}s`,
  };

  return (
    <span className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`} style={styleVars}>
      <span className="shiny-text__base">{text}</span>
      <span className="shiny-text__shine">{text}</span>
    </span>
  );
};

export default ShinyText;
