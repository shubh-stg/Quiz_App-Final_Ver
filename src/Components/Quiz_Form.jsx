// QuizForm.jsx
import React from "react";
import styles from "./Quiz_Form.module.css";

const QuizForm = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  handleStart,
}) => {
  return (
    <form className={styles.formContainer} onSubmit={handleStart}>
      <h2 className={styles.title}>Customize Your Quiz</h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="category">Category:</label>
        <select
          id="category"
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Entertainment: Books</option>
          <option value="11">Entertainment: Film</option>
          <option value="12">Entertainment: Music</option>
          <option value="14">Entertainment: Television</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
        </select>
      </div>
      
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          className={styles.select}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      
      <button className={styles.button} type="submit">Start Quiz</button>
    </form>
  );
};

export default QuizForm;