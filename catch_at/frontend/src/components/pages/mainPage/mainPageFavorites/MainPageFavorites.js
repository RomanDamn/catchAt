import s from "./mainPageFavorites.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"
import { useEffect, useState } from "react";
import deleteFromFavorites from "../../../../actions/deleteFromFavorites";
import MessagesPopup from "../messagesPopup/messagesPopup";
import { useDispatch, useSelector } from "react-redux";
import { makePopupActive } from "../../../../reducers/popupSlice";

const MainPageFavorites = () => {
    const dispatch = useDispatch();
    const popupState = useSelector(state => state.popupState.isActive)
    const [recipientId, setRecipientId] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [favoriteUsers, setFavoriteUsers] = useState([]);
    const [state, updateState] = useState(true);


    useEffect(() => {
        fetch('http://localhost:8000/api/favorites/getAll').then(res => res.json())
            .then(data => {
                const favoriteUsers = data;
                setFavoriteUsers(favoriteUsers);
            })

    }, [state]);
    console.log(favoriteUsers, "000000000000000000")

    //  function deleteFromFavorites(subscriberId, subscribedId){
    //     fetch('http://localhost:8000/api/favorites/delete', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             subscribedId: subscribedId,
    //             subscriberId: subscriberId
    //         })
    //     }).then(res => console.log(res.status)).then(() =>
    //     updateState(!state))
    //  } 

    return (
        <div className={s.mainblock}>
            {favoriteUsers.map(el =>
                <div className={s.mainblock__el}>
                    <div className={s.mainblock__text} onClick={() => {dispatch(makePopupActive(true)); setRecipientId(el.id); setRecipientName(el.username)}} >{el.username}</div>
                    {/* <div className={s.mainblock__messagesCount}>99</div> */}
                    <div className={s.mainblock__star} onClick={() =>{
                         deleteFromFavorites(1, el.id, state, updateState)}}></div>
                </div>
            )}
             { popupState && <MessagesPopup recipientName={recipientName} recipientId={recipientId} active={popupState}/>}
            {/* <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text} >KFC</div>
                        <div  className={s.mainblock__messagesCount}>99</div>
                        <div  className={s.mainblock__star}></div>
                    </div>
                    <div  className={s.mainblock__el} >
                        <div  className={s.mainblock__text}>Weed Farm</div>
                        <div  className={s.mainblock__messagesCount}>1</div>
                        <div  className={s.mainblock__star}></div>
                    </div>
                     <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>Homer</div>
                        <div  className={s.mainblock__messagesCount}>12</div>
                        <div  className={s.mainblock__star}></div>
                    </div>
                    <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>Eric</div>
                        <div  className={s.mainblock__messagesCount}>35</div>
                        <div  className={s.mainblock__star}></div>
                    </div> */}
        </div>
    )
}

export default MainPageFavorites;
