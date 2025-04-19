import styles from "./Quiz.module.css";
import QuizForm from "./Quiz_Form";
import { useEffect, useRef, useState } from "react";
import ScoreCard from "./ScoreCard";
import Spinner from "./Spinner";
import Timer from "./Timer.jsx"
const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Quiz = () => {
  const [index, setindex] = useState(0); //to maintain question number
  const [questions, setQuestions] = useState([]); //for saving all the questions once fetched so that re-render of the UI works well
  const [question, setquestion] = useState(questions[index]); //to display the question correcpoding to tthe current index
  const [lock, setlock] = useState(false); //for selecting a single option
  const [score, setscore] = useState(0); //for calculating the score
  const [resultdisplay, setresultdisplay] = useState(false); //to know when to display the result

  const[category ,setcategory]=useState("");
  const[difficulty,setdifficulty]=useState("");
  const[quizStarted,setQuizStarted]=useState(false);

  //Version-2 : Spinner 
    const [loading,loadingState]=useState(false);

  const Option1 = useRef();
  const Option2 = useRef();
  const Option3 = useRef();
  const Option4 = useRef();

  const option_array = [Option1, Option2, Option3, Option4];


  const handleStart = async (e) => {
    e.preventDefault(); 
    loadingState(true);
    setQuizStarted(true);
    try {
      let url = "https://opentdb.com/api.php?amount=10&type=multiple";

      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;

      const res = await fetch(url);
      const resData = await res.json();

      const formattedData = resData.results.map((q) => {
        const options = [...q.incorrect_answers];
        const correctIndex = Math.floor(Math.random() * 4);
        options.splice(correctIndex, 0, q.correct_answer);

        return {
          question: decodeHtml(q.question),
          option1: decodeHtml(options[0]),
          option2: decodeHtml(options[1]),
          option3: decodeHtml(options[2]),
          option4: decodeHtml(options[3]),
          ans: correctIndex + 1,
        };
      });

      setQuestions(formattedData);
      setquestion(formattedData[0]);
      loadingState(false);

    } catch (error) {
      console.log("Error in fetching in data");
    }

  };

  
  const checkans = (event, givenanswer, question) => {
    if (lock === false) {
      if (question.ans === givenanswer) {
        event.target.classList.add("correct");
        setlock(true);
        // setscore(prev=>{let newscore=prev+1;
        //   console.log(newscore);
        //   return newscore;
        // });
        setscore((prev) => prev + 1);
      } else {
        event.target.classList.add("wrong");
        setlock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (questions.length === index + 1) {
        setresultdisplay(true);
      }
      setindex((prev) => {
        const newIndex = prev + 1;
        setquestion(questions[newIndex]);
        return newIndex;
      });
    }

    setlock(false);

    option_array.map((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };
  const onReset = () => {
    setindex(0);
    setlock(false);
    setresultdisplay(false);
    setscore(0);
    
   
    setQuizStarted(false);
  };

  const again=()=>{
    setindex(0);
    setquestion(questions[0]);
    setlock(false);
    setresultdisplay(false);
    setscore(0);
  }
  const onTimeUp = () => {
    setlock(true); 
    option_array[question.ans - 1].current.classList.add("correct");

  };
  

  return (
    <div className={styles.container}>
      <h1>QUIZ APP</h1>
      <hr className={styles.hr} />
  
  {!quizStarted ? (
  <QuizForm
    category={category}
    setCategory={setcategory}
    difficulty={difficulty}
    setDifficulty={setdifficulty}
    handleStart={handleStart}
  />
): loading ? (
        <Spinner />
      ) : resultdisplay ? (
        <ScoreCard
          score={score}
          total={questions.length}
          onReset={onReset}
          again={again}
        />
      ) : question ? (
        <>

          <h2 className={styles.ques}>
            {index + 1}. {question.question}
          </h2>

          <Timer key={index} duration={15} lock={lock} onTimeUp={onTimeUp} />

          <ul>
            <li ref={Option1} onClick={(e) => checkans(e, 1, question)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkans(e, 2, question)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkans(e, 3, question)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkans(e, 4, question)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className={styles.index}>
            {index + 1} of {questions.length} questions
          </div>
        </>
      ) : (
        <p className="loading">Loading question...</p>
      )}
    </div>
  );}
  
  export default Quiz;