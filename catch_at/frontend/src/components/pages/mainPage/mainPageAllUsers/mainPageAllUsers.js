import s from "./mainPageAllUsers.module.css"
import { useEffect, useState } from "react";

const AllUsers = (props) => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8000/api/users/all').then(res => res.json())
            .then(data => {
                const users = data //Ссылки на данные конкретных объектов
                const allUsers = users.map(user => user.username)
                setUsers(allUsers)
            })
            
            }, []);
            console.log(users, "000000000000000000")
  

        return (
            <div className={s.mainblock}>
                <div className={s.mainblock__el} onClick={() => props.setActive(true)}>
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
                </div>
            </div>
        )
    }

export default AllUsers;