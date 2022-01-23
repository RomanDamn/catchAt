import s from "./mainPageMessages.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"

const mainPageMessages = () => {
    return (
            <div className={s.content}>
                <div className={s.sidebar}>
                    <div className={s.sidebar__el}>ALL</div>
                    <div className={s.sidebar__el}>
                        <img className={s.sidebar__star}
                            src={star}
                            alt="Star"/>
                    </div>
                    <div className={s.sidebar__el}>MES</div>
                    <div className={s.sidebar__el}>ME</div>
                </div>
                <div className={s.mainblock}>
                    <div  className={s.mainblock__el}>
                        <div  className={s.mainblock__text}>KFC</div>
                        <div  className={s.mainblock__messagesCount}>99</div>
                        <div  className={s.mainblock__star}></div>
                    </div>
                    <div  className={s.mainblock__el}>
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
                    </div>
                </div>
        </div>
    )
}

export default mainPageMessages;
