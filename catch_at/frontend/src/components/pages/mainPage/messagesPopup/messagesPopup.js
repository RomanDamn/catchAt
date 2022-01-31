import s from "./messagesPopup.module.css";
import { css } from "@emotion/css"
import { w3cwebsocket } from "websocket"
import { useState, useRef, useEffect } from "react";
import MessageElement from "./messageElement/MessageElement";

const client = new w3cwebsocket('ws://127.0.0.1:9000');

const MessagesPopup = (props) => {
    const [writingUser, setWritingUser] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([]);
    const chatBarScroll = useRef();


    //Handle Enter Button in input area
    const data = JSON.stringify({
        type: "message",
        msg: message,
        user: writingUser
    })
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message) { //&& data[data.length - 1].msg) {
            client.send(data)
        }
    }

    console.log(messages + "-messages")
    console.log(message + "----Message")
    console.log(writingUser, " Writing user")

    client.onopen = () => {
        console.log("WebSocket Client COnnected");
    };

    const scrollToBottom = () => {
        console.log(chatBarScroll.current, "= chatbar")
        console.log(chatBarScroll.current.scrollHeight, "= scrollHeight")
        chatBarScroll.current.scrollTop = chatBarScroll.current.scrollHeight;
    }

    client.onmessage = function (event) {
        const data = JSON.parse(event.data)
        console.log("event.data =  ", event.data, data.msg);
        setMessages([...messages, { msg: message, user: writingUser }]);
        scrollToBottom()
    }

    client.onopen();

    return (
        <div className={` ${s.content} ${props.active ? s.active : ""}`} >
            <div className={s.header}>
                <input value={writingUser} className={s.header__element} onChange={e => setWritingUser(e.target.value)} />
                <div className={s.header__element}> DEL</div>
                <button className={s.header__element} onClick={() => props.setActive(false)}> X</button>
            </div>
            <div ref={chatBarScroll} className={s.messages}>
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
                {messages && messages.map(mes => <MessageElement key={mes} messages={mes} />)}
            </div>

            <div className={s.messages__writingArea}>
                <input value={message} className={s.messages__sendText}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} />
                <div className={s.messages__sendButton} onClick={() => {
                    const data = JSON.stringify({
                        type: "message",
                        msg: message,
                        user: writingUser,
                    })
                    { message && client.send(data); }
                }}>{'>'} </div>
            </div>
        </div>
    )
}

export default MessagesPopup;