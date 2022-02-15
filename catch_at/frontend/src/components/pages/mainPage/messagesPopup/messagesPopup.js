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

    const [senderId, setSenderId] = useState(1)
    const [recipientId, setRecipientId] = useState(2)



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

    client.onopen = () => {
        console.log("WebSocket Client COnnected");
    };

    const scrollToBottom = () => {
        chatBarScroll.current.scrollTop = chatBarScroll.current.scrollHeight;
    }

    client.onmessage = function (event) {
        console.log("event.data =  ", event.data);
        // const data = JSON.parse(event.data)
        setMessages([...messages, { msg: event.data, user: writingUser }]);
        scrollToBottom()
    }

    client.onopen();
    useEffect(() => {
        console.log('IN USE EFFECT')
        fetch("http://localhost:8000/api/messages", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: senderId,
                recipientId: recipientId
            })
        }).then(res => res.json()
        ).then(data => 
            Array.from(data).forEach(el => setMessages([...messages,{ msg: el.msg, user: writingUser }])))
        // .then(res => res.foreach(el => {
        //     console.log(el, "------------element");
        //     setMessages([...messages, el])
        // }))
            //.then(res => setMessages([...messages, res]))
            


        console.log("in end OF EFFECT")
        //console.log(messages, "==========messages")
    }, []);
    // const getMessages = async (senderId, recipientId) =>{
    //     const getUserMessages = await fetch("http://localhost:8000/api/messages", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             senderId: senderId,
    //             recipientId: recipientId
    //         })
    //     })
    // }
    messages.forEach(el => console.log(el, "current Messages in messsages"))
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
                {messages.map(mes => <MessageElement messages={mes} />)}
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