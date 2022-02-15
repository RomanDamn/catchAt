import s from "./MessageElement.module.css"

const MessageElement = (props) => {
    const messages = props.messages;
//console.log(messages, "=====ElementMessage")
    return (
        <div className={` ${s.messages__message} ${messages.user === "Roman" ? s.messages__message_your : ""}`}>
            <div className={s.messages__text}>{messages.msg}</div>
            <div className={s.messages__del}>DEL</div>
        </div>
    )
}
export default MessageElement;