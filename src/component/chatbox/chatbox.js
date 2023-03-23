import "./style.css"
import { useRef, useEffect, useState } from "react"

export default function Chatbox(props) {
    const text = useRef();
    const [size, setSize] = useState([]);
    

    useEffect(() => {
        setSize([text.current.offsetWidth+120, text.current.offsetHeight+40])

        return () => { };
    }, [text.current])


    return (
        <div id={props.id} className='chat' style={{ "--index": props.index,width: size[0], "--width": size[0]+"px", minHeight: size[1]}}>
            <p ref={text}>{props.children}</p>
            <div className='box' style={{ "--width": size[0]+"px", minHeight: size[1]}} />
            <div className='box outer' style={{"--width": size[0]+"px", minHeight: size[1]}} />
            <figure className='arrow' />
            <figure className='arrow outer' />

        </div>

    )
}
