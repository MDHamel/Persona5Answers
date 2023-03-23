import "./style.css"
import { useRef, useEffect, useState } from "react"
import Chatbox from "../chatbox/chatbox";

export default function Questionbox(props) {
    const text = useRef();
    const [size, setSize] = useState([]);
    

    useEffect(() => {
        setSize([text.current.offsetWidth+120, text.current.offsetHeight+40])

        return () => { };
    }, [text.current])


    return (
        <div id={props.id} style={{"--index":props.index}}className='question' >
            <Chatbox id="small">Question</Chatbox>
            <p ref={text}>{props.children}</p>
            <div className='box' />
            <div className='box outer' />
            
            <figure className='arrow' id="one"/>
            <figure className='arrow outer' id="one"/>

            <figure className='arrow' id="two"/>
            <figure className='arrow outer' id="two"/>

            <figure className='arrow' id="three"/>
            <figure className='arrow outer' id="three"/>
            
        </div>

    )
}