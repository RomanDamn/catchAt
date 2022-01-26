import s from "./messagesPopup.module.css";
import { w3cwebsocket } from "websocket"
import { useState } from "react";
import MessageElement from "./messageElement/MessageElement";

const client = new w3cwebsocket('ws://127.0.0.1:9000');

const MessagesPopup = (props) => {

    const [messages , setMessages] = useState([]);
    const [message, setMessage] = useState("")

//Handle Enter Button in input area
    const data = JSON.stringify({
        type: "message",
        msg: message
    })
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && data[data.length - 1].msg) {
          client.send(data)
        }
    }


    console.log(messages[0] + "+++++++++++++")
    console.log(message + "----Message")

    client.onopen = () => {
        console.log("WebSocket Client COnnected");
    };

    client.onmessage = function (event) {
        const data = JSON.parse(event.data)
        console.log("event.data =  ", event.data, data.msg);
        setMessages([...messages, data.msg]);
    }

    client.onopen();
    return (
        <div className={` ${s.content} ${props.active ? s.active : ""}`} >
            <div className={s.header}>
                <div className={s.header__element}>Weed Farm</div>
                <div className={s.header__element}> DEL</div>
                <button className={s.header__element} onClick={() => props.setActive(false)}> X</button>
            </div>
            <div className={s.messages}>
                <div className={s.messages__message}>
                    <div className={s.messages__text}>How r u boooooooooooooooooooy?</div>
                    <div className={s.messages__del}>DEL</div>
                </div>
                <div className={s.messages__message}>
                    <div className={s.messages__text}>alive?</div>
                    <div className={s.messages__del}>DEL</div>
                </div>
                <div className={[s.messages__message, s.messages__message_your].join(' ')}>
                    <div className={s.messages__text}>yeaah, thanks, just hangover</div>
                    <div className={s.messages__del}>DEL</div>
                </div>
                <div className={s.messages__message}>
                    <div className={s.messages__text}>lol, consequences</div>
                    <div className={s.messages__del}>DEL</div>
                </div>
                <div className={[s.messages__message, s.messages__message_your].join(' ')}>
                    <div className={s.messages__text}>I knew, I would be like this</div>
                    <div className={s.messages__del}>DEL</div>
                </div>
                {messages.map(mes =><MessageElement messages={mes}/> )}
            </div>
            <div className={s.messages__writingArea}>
                <input value={message} className={s.messages__sendText} 
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} />
                <div className={s.messages__sendButton} onClick={() => {
                    const data = JSON.stringify({
                        type: "message",
                        msg: message,
                        user: "Roman"
                    })
                    {data[data.length - 1].msg && client.send(data);}
                }}>{'>'} </div>
            </div>
        </div>
    )
}

export default MessagesPopup;