import s from "./mainPageAllUsers.module.css"
import { useEffect, useState } from "react";
import addToFavorites from "../../../../actions/addToFavorites";
import deleteFromFavorites from "../../../../actions/deleteFromFavorites";
import MessagesPopup from "../messagesPopup/messagesPopup";
import { useDispatch, useSelector } from "react-redux";
import { makePopupActive } from "../../../../reducers/popupSlice";

const AllUsers = (props) => {
    const dispatch = useDispatch();
    const popupState = useSelector(state => state.popupState.isActive)
    const [users, setUsers] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [recipientId, setRecipientId] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [state, updateState] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/users/all').then(res => res.json())
            .then(data => {
                const users = data;
                const allUsers = users.map(user => user);
                console.log(allUsers, "allUsers")
                setUsers(users);
            });
            fetch('http://localhost:8000/api/favorites/getAll').then(res => res.json())
            .then(data => {
                const favoriteUsers = data;
                const allFavorites = favoriteUsers.map(favorite => favorite.id)
                setFavorites(allFavorites);
            })

    }, [state]);


    // function addToFavorites(subscriberId, subscribedId) {
    //     fetch('http://localhost:8000/api/favorites/add', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             subscribedId: subscribedId,
    //             subscriberId: subscriberId
    //         })
    //     }).then(res => console.log(res.status))
    // }



    return (
        <div className={s.mainblock}>
            {users.map(el =>
                <div className={s.mainblock__el} key={el.id}>
                    <div className={s.mainblock__text} onClick={() => {dispatch(makePopupActive(true)); setRecipientId(el.id); setRecipientName(el.username)}}>{el.username}</div>
                    <div className={s.mainblock__messagesCount}>{el.id}</div>
                    <div className={` ${s.mainblock__star} ${favorites.includes(el.id) ? "" : s.mainblock__star_active}`} onClick={() => {
                        {favorites.includes(el.id) ? deleteFromFavorites(1,el.id, state, updateState) : addToFavorites(1,el.id, state, updateState)}
                        }}></div>
                </div>)}
                { popupState && <MessagesPopup recipientName={recipientName} recipientId={recipientId} active={popupState}/>}
            {/* <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__text}>KFC</div>
                    <div className={s.mainblock__messagesCount}>99</div>
                    <div className={s.mainblock__star}></div>
                </div>
                <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__text}>Weed Farm</div>
                    <div className={s.mainblock__messagesCount}>1</div>
                    <div className={s.mainblock__star}></div>
                </div>
                <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__text}>Homer</div>
                    <div className={s.mainblock__messagesCount}>12</div>
                    <div className={s.mainblock__star}></div>
                </div>
                <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__text}>Eric</div>
                    <div className={s.mainblock__messagesCount}>35</div>
                    <div className={s.mainblock__star}></div>
                </div>
                <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
                    <div className={s.mainblock__text}>Anri Rey</div>
                    <div className={s.mainblock__messagesCount}>99</div>
                    <div className={s.mainblock__star}></div>
                </div> */}
        </div>
    )
}

export default AllUsers;