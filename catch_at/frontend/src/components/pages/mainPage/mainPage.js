import { Route, BrowserRouter } from "react-router-dom";
import s from "./mainPage.module.css";
import star from "../../../assets/images/icons/star-5-128.png"
import Favorites from "../mainPage/mainPageFavorites/MainPageFavorites"
import Messages from "./mainPageMessages/mainPageMessages"
import Profile from "../mainPage/profile/profile"
import {Link} from "react-router-dom";
import allUsers from "./mainPageAllUsers/mainPageAllUsers";
import { useDispatch, useSelector } from "react-redux";
import isActiveButtonReducer from "../../../reducers/isActiveButtonReducer";

const MainPage = () => {
    const dispatch = useDispatch();
    const isActiveButon = useSelector(state => state.isActive.isActive)
    const buttonId = useSelector(state =>state.isActive.id)
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
                    <Link to="/all" onClick={() => dispatch({type : "MAKE_ACTIVE", payload:{id:1}})}
                    className={` ${s.sidebar__el} ${isActiveButon && buttonId === 1 ? s.activeButton : ""}`} >
                        ALL
                    </Link>
                    <Link to="/favorites" onClick={() => dispatch({type : "MAKE_ACTIVE", payload:{id:2}})}>
                        <div className={` ${s.sidebar__el} ${isActiveButon && buttonId == 2 ? s.activeButton : ""}`} >
                            <img className={s.sidebar__star}
                                src={star}
                                alt="Star" />
                        </div>
                    </Link>
                    <Link to="/messages" onClick={() => dispatch({type : "MAKE_ACTIVE", payload:{id:3}})}>
                        <div className={` ${s.sidebar__el} ${isActiveButon && buttonId == 3 ? s.activeButton : ""}`} >MES</div>
                    </Link>
                    <Link to="/profile" onClick={() => dispatch({type : "MAKE_ACTIVE", payload:{id:4}})}>
                        <div className={` ${s.sidebar__el} ${isActiveButon && buttonId == 4? s.activeButton : ""}`} >ME</div>
                    </Link>
                </div>
                    <Route component={Favorites} path="/favorites" />
                    <Route component={Messages} path="/messages" />
                    <Route component={Profile} path="/profile" />
                    <Route component={allUsers} path="/all" />
            </div>
            <div className={s.footer}>
            </div>
            </div>
        </BrowserRouter>
    )
}

export default MainPage;
