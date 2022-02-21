import s from "./mainPageMessages.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"
import { useEffect, useState } from "react";

const MainPageMessages = (props) => {
    const [messagedUsers, setMessagedUsers] = useState("");


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
                    <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>KFC</div>
                        <div  className={s.mainblock__message} onClick={() => props.setActive(true)}>Lets celebrate</div>
                    </div>
                    <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>Weed Farm</div>
                        <div  className={s.mainblock__message} onClick={() => props.setActive(true)}>
                            <div className={s.mainblock__author}>You: </div>I believe I can fly
                        </div>
                    </div>
                     <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>Homer</div>
                        <div  className={s.mainblock__message} onClick={() => props.setActive(true)}>i belive I can touch the sky</div>
                    </div>
                    <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>Eric</div>
                        <div  className={s.mainblock__message} onClick={() => props.setActive(true)}>Spread the wings and fly away</div>
                    </div>
                </div>
    )
}

export default MainPageMessages;
