import './App.css';

import { useState } from "react";
import answers from "./answers.json"
import Questionbox from './component/questionbox/questionbox';
import Chatbox from './component/chatbox/chatbox';

import backpng from "./assets/back-test.png";

const months = ["4", "5","6","7","9","10", "11", "12", "1"];

function getLastDay() {
  if (!document.cookie) {
    document.cookie = `month=0;`
    document.cookie = `day=0;`
    return [0, 0];
  }
  else {
    let cookie = document.cookie.split(";");

    console.log(cookie[0].split("=")[1], cookie[1].split("=")[1])

    return [cookie[0].split("=")[1], cookie[1].split("=")[1]]
  }


}

function App() {
  const lastDay = [0, 0];

  const [monthIndex, setMonthIndex] = useState(parseInt(lastDay[0]));

  const days = Object.keys(answers[months[monthIndex]]);
  const [dayIndex, setDayIndex] = useState(parseInt(lastDay[1]));



  const nextHandler = () => {
    if (dayIndex + 1 < days.length) {
      setDayIndex(prev => prev + 1);
    }
    else {
      if (monthIndex + 1 < months.length) {
        setMonthIndex(prev => prev + 1);
        setDayIndex(0);
      }
    }

  }

  const prevHandler = () => {
    if (dayIndex - 1 >= 0) {
      setDayIndex(prev => prev - 1);
    }
    else {
      if (monthIndex - 1 >= 0) {
        const tempDays = Object.keys(answers[months[monthIndex-1]]);

        setMonthIndex(prev => prev - 1);
        setDayIndex(tempDays.length-1);

      }
    }
  }


  return (
    <div className="App">
      <img className='background' src={backpng} />
      <span className='button left' onClick={prevHandler}>Prev</span>
      <span className="date stroke"><span id="month">{months[monthIndex]}<span style={{fontSize:".75em"}}>/</span></span> <span id="day">{days[dayIndex]}</span></span>
      <span className="date"><span id="month">{months[monthIndex]}<span style={{fontSize:".75em"}}>/</span></span> <span id="day">{days[dayIndex]}</span></span>

      <div className='cardList' >
        
        {answers[months[monthIndex]][days[dayIndex]].map((item, index) => { return <Card data={item} key={dayIndex + ":" + index} index={index}/> })}
      </div>

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


export default App;
