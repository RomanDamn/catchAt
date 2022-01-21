import { Route, BrowserRouter } from "react-router-dom";
import s from "./mainPage.module.css";
import star from "../../../assets/images/icons/star-5-128.png"
import Favorites from "../mainPage/mainPageFavorites/MainPageFavorites"
import Messages from "./mainPageMessages/mainPageMessages"
import Profile from "../mainPage/profile/profile"

const mainPage = () => {
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
                <Route component={Favorites} path="/Favorites" />
                <Route component={Messages} path="/Messages" />
                <Route component={Profile} path="/Profile" />
                <div className={s.sidebar}>
                    <div className={s.sidebar__el}>ALL</div>
                    <div className={s.sidebar__el}>
                        <img className={s.sidebar__star}
                            src={star}
                            alt="Star" />
                    </div>
                    <div className={s.sidebar__el}>MES</div>
                    <div className={s.sidebar__el}>ME</div>
                </div>
                <div className={s.mainblock}>
                    <div className={s.mainblock__el}>
                        <div className={s.mainblock__text}>KFC</div>
                        <div className={s.mainblock__messagesCount}>99</div>
                        <div className={s.mainblock__star}></div>
                    </div>
                    <div className={s.mainblock__el}>
                        <div className={s.mainblock__text}>Weed Farm</div>
                        <div className={s.mainblock__messagesCount}>1</div>
                        <div className={s.mainblock__star}></div>
                    </div>
                    <div className={s.mainblock__el}>
                        <div className={s.mainblock__text}>Homer</div>
                        <div className={s.mainblock__messagesCount}>12</div>
                        <div className={s.mainblock__star}></div>
                    </div>
                    <div className={s.mainblock__el}>
                        <div className={s.mainblock__text}>Eric</div>
                        <div className={s.mainblock__messagesCount}>35</div>
                        <div className={s.mainblock__star}></div>
                    </div>
                    <div className={s.mainblock__el}>
                        <div className={s.mainblock__text}>Anri Rey</div>
                        <div className={s.mainblock__messagesCount}>99</div>
                        <div className={s.mainblock__star}></div>
                    </div>
                </div>
            </div>
            <div className={s.footer}>

            </div>
        </BrowserRouter>
    )
}

export default mainPage;
