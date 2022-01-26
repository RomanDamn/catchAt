import s from "./MessageElement.module.css"

const MessageElement = (props) => {
    return (
        <div className={[s.messages__message, s.messages__message_your].join(' ')}>
            <div className={s.messages__text}>{props.messages}</div>
            <div className={s.messages__del}>DEL</div>
        </div>
    )
}
export default MessageElement;