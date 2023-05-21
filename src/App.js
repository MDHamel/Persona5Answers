import { useState, useEffect, useRef } from "react";
import answers from "./answers.json";
import Questionbox from "./component/questionbox/questionbox";
import Chatbox from "./component/chatbox/chatbox";
import backpng from "./assets/background.png";
import maskpng from "./assets/mask.png";
import "./App.css";

const months = ["4", "5", "6", "7", "9", "10", "11", "12", "1"];
const expireDate = new Date();
expireDate.setFullYear(expireDate.getFullYear() + 100);

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return 0;
}

function setCookie(name, value, expires) {
  document.cookie = `${name}=${value}; expires=${expireDate.toUTCString()}; path=/`;
}

function App() {
  const [monthIndex, setMonthIndex] = useState(parseInt(getCookie("month")));
  const days = Object.keys(answers[months[monthIndex]]);
  const [dayIndex, setDayIndex] = useState(parseInt(getCookie("day")));

  const scrollDivRef = useRef(null);
  const [endOfPage, setIfEndOfPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const div = scrollDivRef.current;
      setIfEndOfPage(div.scrollHeight - div.scrollTop - div.clientHeight <= 200);
      console.log(div.scrollHeight - div.scrollTop <= div.clientHeight);
    };

    const scrollDiv = scrollDivRef.current;
    if (scrollDiv) {
      scrollDiv.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollDiv) {
        scrollDiv.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    setCookie("month", monthIndex);
    scrollDivRef.current.scrollTo(0, 0);
  }, [monthIndex]);

  useEffect(() => {
    scrollDivRef.current.scrollTo(0, 0);
    setCookie("day", dayIndex);
  }, [dayIndex]);

  const nextHandler = () => {
    if (dayIndex + 1 < days.length) {
      setDayIndex(prev => prev + 1);
    } else if (monthIndex + 1 < months.length) {
      setMonthIndex(prev => prev + 1);
      setDayIndex(0);
    }
  };

  const prevHandler = () => {
    if (dayIndex - 1 >= 0) {
      setDayIndex(prev => prev - 1);
    } else if (monthIndex - 1 >= 0) {
      const tempDays = Object.keys(answers[months[monthIndex - 1]]);
      setMonthIndex(prev => prev - 1);
      setDayIndex(tempDays.length - 1);
    }
  };

  //date component, dependant on most app components so made inside the main app component,
  const DateMenu = () => {

    const monthRef = useRef(null);
    const dayRef = useRef(null);


    const handleMonthChange = (event) => {
      setMonthIndex(months.indexOf(event.target.value));
      setDayIndex(0);
    };

    const handleDayChange = (event) => {
      setDayIndex(days.indexOf(event.target.value));
    };

    //day width is more dynamic than the month widths which seem to only be 2 values. 
    //Its a good idea to try find a size that will fit just the current value.
    const [dayWidth, setDayWidth] = useState("");

    useEffect(()=>{
      if(dayWidth !== `${dayRef.current.offsetWidth}px`)
        setDayWidth(`${dayRef.current.offsetWidth}px`);
    }, [dayIndex, dayRef])

    return (
      <aside className="date" >
        <span className="content" id="day" ref={dayRef} style={{visibility:"hidden", position:"fixed", width:"fit-content", padding: "8px"}}>{days[dayIndex]}</span>
        <div className="stroke">
          
          <span id="month" className="content" style={{width: months[monthIndex] > 9 ? "92px" : "48px"}}>
            {months[monthIndex]}
          </span>
          <span className="slash">/</span>
          <span id="day" className="content" onChange={handleDayChange} style={{width: dayWidth || "165px"}}>
            {days[dayIndex]}
          </span>
        </div>
        <select
          id="month"
          className="content"
          value={months[monthIndex]}
          onChange={handleMonthChange}
          style={{width: months[monthIndex] > 9 ? "92px" : "48px"}}
        >
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <span className="slash">/</span>
        <select
          id="day"
          className="content"
          value={days[dayIndex]}
          onChange={handleDayChange}
          style={{width: dayWidth || "165px"}}
        >
          {days.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>
      </aside>
    );
  };

  return (
    <div className="App">
      <img className="background" src={backpng} />
      <span className="button left" onClick={prevHandler}>
        Prev
      </span>
      <DateMenu />
      <div className="cardList">
        <section ref={scrollDivRef}>
          {answers[months[monthIndex]][days[dayIndex]].map((item, index) => (
            <Card data={item} key={dayIndex + ":" + index} index={index} />
          ))}
        </section>
      </div>
      {answers[months[monthIndex]][days[dayIndex]].length > 1 && !endOfPage && (
        <ScrollIndicator />
      )}
      <span className="button right" onClick={nextHandler}>
        Next
      </span>
    </div>
  );
}

function Card(props) {
  return (
    <div className="card">
      <Questionbox index={props.index}>{props.data.question}</Questionbox>
      <Chatbox>{props.data.answer}</Chatbox>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="scrollIndicator">
      <h2 className="stroke">Scroll</h2>
      <h2>Scroll</h2>
      <img id="mask" src={maskpng} />
      {[0, 0.33, 0.66].map((delay) => (
        <svg
          key={delay}
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          fill="currentColor"
          className="bi bi-chevron-compact-down"
          viewBox="0 0 16 16"
          style={{ "--delay": `${delay}s` }}
        >
          <path
            fillRule="evenodd"
            d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
          />
        </svg>
      ))}
    </div>
  );
}

export default App;
