import s from "./mainPageMessages.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode"
import MessagesPopup from "../messagesPopup/messagesPopup";
import { makePopupActive } from "../../../../reducers/popupSlice";

const MainPageMessages = (props) => {
    const [messagedUsers, setMessagedUsers] = useState("");
    const token = useSelector(state => state.tokenState.token)
    const decodedToken = token ? jwt_decode(token) : ""
    const popupState = useSelector(state => state.popupState.isActive)
    const dispatch = useDispatch()


    useEffect(() => {
        fetch("http://localhost:8000/api/users/messagedUsers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                senderId: 1
            })
        }).then(res => res.json()
        ).then(data => setMessagedUsers(data))

    }, []);
    console.log(messagedUsers, "=messagedUsers")
    return (
        <div className={s.mainblock}>
            {messagedUsers ? messagedUsers.map((el) => {
                return (
                    el.senderId === decodedToken.id ?
                        <div className={s.mainblock__el}>
                            <div className={s.mainblock__text}>{el.recipientName}</div>
                            <div className={s.mainblock__message} onClick={() =>dispatch(makePopupActive(true))}> You: {el.message}</div>
                        </div>
                        :
                        <div className={s.mainblock__el}>
                            <div className={s.mainblock__text}>{el.senderName}</div>
                            <div className={s.mainblock__message} onClick={() => dispatch(makePopupActive(true))}>{el.message}</div>
                        </div>
                )
            }) : ""}
            { popupState && <MessagesPopup recipientName={decodedToken.username} recipientId={decodedToken.id} active={popupState}/>}
            {/* <div className={s.mainblock__el}>
                <div className={s.mainblock__text}>KFC</div>
                <div className={s.mainblock__message} onClick={() => props.setActive(true)}>Lets celebrate</div>
            </div>
            <div className={s.mainblock__el}>
                <div className={s.mainblock__text}>Weed Farm</div>
                <div className={s.mainblock__message} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__author}>You: </div>I believe I can fly
                </div>
            </div>
            <div className={s.mainblock__el}>
                <div className={s.mainblock__text}>Homer</div>
                <div className={s.mainblock__message} onClick={() => props.setActive(true)}>i belive I can touch the sky</div>
            </div>
            <div className={s.mainblock__el}>
                <div className={s.mainblock__text}>Eric</div>
                <div className={s.mainblock__message} onClick={() => props.setActive(true)}>Spread the wings and fly away</div>
            </div> */}
        </div>
    )
}

export default MainPageMessages;
