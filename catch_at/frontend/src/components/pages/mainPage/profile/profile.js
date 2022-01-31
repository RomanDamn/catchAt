import s from "./profile.module.css";
import star from "../../../../assets/images/icons/star-5-128.png"

const profile = () => {
    return (

        <div className={s.profile}>
            <h1 className={s.profile__username}>Roman</h1>
            <div className={s.profile__content}>
                <div className={s.profile__image}></div>
                <div className={s.profile__updateButton}>Update Image</div>
                <div className={s.profile__exitButton}>Exit</div>
            </div>
        </div>
    )
}

export default profile;
