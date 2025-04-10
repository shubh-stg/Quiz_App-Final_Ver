import styles from "./ScoreCard.module.css"
const ScoreCard = ({ score, total, onReset,again }) => {
  return (
    <div className={styles.scorecard}>
      <h2>You Scored {score} out of {total}</h2>
      <button onClick={again}>Try Again</button>
      <button onClick={onReset}>Reset</button>
     
    </div>
  );
};

export default ScoreCard;
