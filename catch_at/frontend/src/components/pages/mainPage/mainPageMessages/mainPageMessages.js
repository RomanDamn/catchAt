import s from "./mainPageMessages.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"

const mainPageMessages = (props) => {
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

export default mainPageMessages;
