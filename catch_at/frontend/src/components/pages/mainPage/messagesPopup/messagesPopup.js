import s from "./messagesPopup.module.css";
import { w3cwebsocket } from "websocket"
import { useState, useRef, useEffect } from "react";
import MessageElement from "./messageElement/MessageElement";
import jwt_decode from "jwt-decode"
import { useDispatch, useSelector } from "react-redux";
import { makePopupActive } from "../../../../reducers/popupSlice";

const client = new w3cwebsocket('ws://127.0.0.1:9000');

const MessagesPopup = (props) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("")
    const [userMessages, setUserMessages] = useState([]);
    const [recipientMessages, setRecipientMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const chatBarScroll = useRef();

    console.log(allMessages, "allMess")

    const token = useSelector(state => state.tokenState.token)
    const decodedToken = token ? jwt_decode(token) : ""
    console.log("decodedToken == ", decodedToken)

    //Handle Enter Button in input area
    const data = JSON.stringify({
        type: "message",
        msg: message,
        senderId: decodedToken.id,
        recipientId: props.recipientId,
    })
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && message) client.send(data);
    }

    client.onopen = () => {
        console.log("WebSocket Client COnnected");
    };

    const scrollToBottom = () => {
        chatBarScroll.current.scrollTop = chatBarScroll.current.scrollHeight;
    }

    client.onmessage = function (event) {
        const data = JSON.parse(event.data)
        setAllMessages([...allMessages, { msg: data.msg, senderId: data.senderId, recipientId: data.recipientId }]);
        scrollToBottom()
        setMessage("")
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
                senderId: decodedToken.id,
                recipientId: props.recipientId
            })
        }).then(res => res.json()
        ).then(data => setUserMessages(data))
        

        fetch("http://localhost:8000/api/messages", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    senderId: props.recipientId,
                    recipientId: decodedToken.id
                })
            }).then(res => res.json()
            ).then(data => setRecipientMessages(data))

            //scrollToBottom()

    }, []);

    useEffect(() =>{
        scrollToBottom()
    },[allMessages])

     let allMsg = userMessages.concat(recipientMessages)
        allMsg.forEach(el => {
            if(!allMessages.includes(el)) setAllMessages([...allMessages, el])
        })
        allMsg = allMessages.sort(function(a,b){
            return new Date(a.createdAt) - new Date(b.createdAt);})
console.log(props, "props")
    return (
        <div className={` ${s.content} ${props.active ? s.active : ""}`} >
            <div className={s.header}>
                <div value={props.recipientName} className={s.header__element}>{props.recipientName}</div>
                <div className={s.header__element}> DEL</div>
                <button className={s.header__element} onClick={() => dispatch(makePopupActive(false))}> X</button>
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
                {allMsg.map(mes => <MessageElement messages={mes} token={decodedToken} />)}
            </div>

            <div className={s.messages__writingArea}>
                <input value={message} className={s.messages__sendText}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown} />
                <div className={s.messages__sendButton} onClick={() => {
                    const data = JSON.stringify({
                        type: "message",
                        msg: message,
                        senderId: decodedToken.id,
                        recipientId: props.recipientId
                    })
                    { message && client.send(data); }
                }}>{'>'} </div>
                {/* <div onClick={e => scrollToBottom()}>Scroll</div> */}
            </div>
        </div>
    )
}

export default MessagesPopup;