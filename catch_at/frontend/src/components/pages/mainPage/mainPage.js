import { Route, BrowserRouter } from "react-router-dom";
import { useState } from "react";
import s from "./mainPage.module.css";
import star from "../../../assets/images/icons/star-5-128.png"
import Favorites from "../mainPage/mainPageFavorites/MainPageFavorites"
import Messages from "./mainPageMessages/mainPageMessages"
import Profile from "../mainPage/profile/profile"
import MessagesPopup from "./messagesPopup/messagesPopup";
import { Link } from "react-router-dom";
import AllUsers from "./mainPageAllUsers/mainPageAllUsers";
import { useDispatch, useSelector } from "react-redux";
import isActiveButtonSlice, { makeActive } from "../../../reducers/isActiveButtonSlice";
import MainPageMessages from "./mainPageMessages/mainPageMessages";
import jwt_decode from "jwt-decode";
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket('ws://127.0.0.1:9000');

const MainPage = () => {
    const [messagesBarActive, setMessagesBarActive] = useState(false);
    const [recipientId, setRecipientId] = useState('')
    const dispatch = useDispatch();
    const isActiveButon = useSelector(state => state.isActiveState.isActive)
    const buttonId = useSelector(state => state.isActiveState.id)
    client.onopen = () => {
        console.log("WebSocket Client COnnected");
    };
    client.onopen();
    return (
        <BrowserRouter>
            <div className={s.page}>
                <div className={s.header}>
                    <div className={s.header__element}> John</div>
                    <div className={s.header__element}> Eric</div>
                    <div className={s.header__element}> Money</div>
                    <div className={s.header__element}> Cash</div>
                    <div className={s.header__element}> ==&gt;</div>
                </div>

                <div className={s.content}>
                    <div className={s.sidebar}>
                        <Link to="/all" onClick={() => dispatch(makeActive(1))}
                        className={` ${s.sidebar__el} ${isActiveButon && buttonId === 1 ? s.activeButton : ""}`} >
                            ALL
                        </Link>
                        <Link to="/favorites" onClick={() => dispatch(makeActive(2))}>
                            <div className={` ${s.sidebar__el} ${isActiveButon && buttonId == 2 ? s.activeButton : ""}`} >
                                <img className={s.sidebar__star}
                                    src={star}
                                    alt="Star" />
                            </div>
                        </Link>
                        <Link to="/messages" onClick={() => dispatch(makeActive(3))}
                        className={` ${s.sidebar__el} ${isActiveButon && buttonId == 3 ? s.activeButton : ""}`}>
                            MES
                        </Link>
                        <Link to="/profile" onClick={() => dispatch(makeActive(4))}
                        className={` ${s.sidebar__el} ${isActiveButon && buttonId == 4 ? s.activeButton : ""}`}>
                            ME
                        </Link>
                    </div>
                    <Route component={Favorites} path="/favorites" />
                    <Route component={Messages} path="/messages">
                        <MainPageMessages active={messagesBarActive} setActive={setMessagesBarActive} />
                    </Route>
                    <Route component={Profile} path="/profile" />
                    <Route path="/all">
                        <AllUsers setRecipientId={setRecipientId} active={messagesBarActive} setActive={setMessagesBarActive} />  
                    </Route>
                </div>
                <div className={s.footer}>
                </div>
                {/* <MessagesPopup recipientId={recipientId} active={messagesBarActive} setActive={setMessagesBarActive}/> */}
            </div>
        </BrowserRouter>
    )
}

export default MainPage;
