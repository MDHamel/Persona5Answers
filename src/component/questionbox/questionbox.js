import "./style.css"
import { useRef, useEffect, useState } from "react"
import Chatbox from "../chatbox/chatbox";

export default function Questionbox(props) {

    return (
        <div id={props.id} style={{"--index":props.index}}className='question' >
            <Chatbox id="small">Question</Chatbox>
            <p >{props.children}</p>
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