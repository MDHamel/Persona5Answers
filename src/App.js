import './App.css';

import { useState } from "react";
import answers from "./answers.json"
import Questionbox from './component/questionbox/questionbox';
import Chatbox from './component/chatbox/chatbox';

import backpng from "./assets/background.png";
import maskpng from "./assets/mask.png";


const months = ["4", "5", "6", "7", "9", "10", "11", "12", "1"];
const expireDate = "Fri, 31 Dec 9999 23:59:59 GMT";

function getLastDay() {
  if (!document.cookie) {
    document.cookie = `month=0;expires=${expireDate}`;
    document.cookie = `day=0;;expires=${expireDate}`;
    return [0, 0];
  }
  else {
    let cookie = document.cookie.split(";");

    if (cookie[0].split("=")[1] === "NaN" || cookie[1].split("=")[1] === "NaN") {
      document.cookie = `month=0;expires=${expireDate}`;
      document.cookie = `day=0;expires=${expireDate}`;
    }

    return [cookie[0].split("=")[1], cookie[1].split("=")[1]]
  }
}


function App() {
  const lastDay = getLastDay();

  const [monthIndex, setMonthIndex] = useState(parseInt(lastDay[0]));

  const days = Object.keys(answers[months[monthIndex]]);
  const [dayIndex, setDayIndex] = useState(parseInt(lastDay[1]));

  const setLastDay = (month, day) => {
    document.cookie = `month=${monthIndex + month};expires=${expireDate}`;
    document.cookie = `day=${dayIndex + day};expires=${expireDate}`;
  }



  const nextHandler = () => {
    if (dayIndex + 1 < days.length) {
      setDayIndex(prev => prev + 1);
      setLastDay(0, 1);

    }
    else if (monthIndex + 1 < months.length) {
      setMonthIndex(prev => prev + 1);
      setDayIndex(0);
      setLastDay(1, -dayIndex);
    }
  }

  const prevHandler = () => {
    if (dayIndex - 1 >= 0) {
      setDayIndex(prev => prev - 1);
      setLastDay(0, -1);
    }
    else if (monthIndex - 1 >= 0) {
      const tempDays = Object.keys(answers[months[monthIndex - 1]]);

      setMonthIndex(prev => prev - 1);
      setDayIndex(tempDays.length - 1);
      setLastDay(-1, -dayIndex + tempDays.length - 1);

    }
  }


  return (
    <div className="App">
      <img className='background' src={backpng} />
      <span className='button left' onClick={prevHandler}>Prev</span>
      <span className="date stroke"><span id="month">{months[monthIndex]}<span style={{ fontSize: ".75em" }}>/</span></span> <span id="day">{days[dayIndex]}</span></span>
      <span className="date"><span id="month">{months[monthIndex]}<span style={{ fontSize: ".75em" }}>/</span></span> <span id="day">{days[dayIndex]}</span></span>

      <div className='cardList' >
        <section >
          {answers[months[monthIndex]][days[dayIndex]].map((item, index) => { return <Card data={item} key={dayIndex + ":" + index} index={index} /> })}
        </section>
      </div>
      {answers[months[monthIndex]][days[dayIndex]].length > 1 ? <ScrollIndicator /> : ""}
      <span className='button right' onClick={nextHandler}>Next</span>
    </div>
  );
}

function Card(props) {

  return (
    <div className='card'>

      <Questionbox index={props.index}>{props.data.question}</Questionbox>
      <Chatbox>{props.data.answer}</Chatbox>

    </div>
  )
}

function ScrollIndicator() {

  return (
    <div className='scrollIndicator'>
      <h2 className='stroke'>Scroll</h2>
      <h2>Scroll</h2>
      <img id="mask" src={maskpng} />

      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16" style={{"--delay":"0s"}}>
        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16" style={{"--delay":".33s"}}>
        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16" style={{"--delay":".66s"}}>
        <path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
      </svg>
      

    </div>
  )
}


export default App;
