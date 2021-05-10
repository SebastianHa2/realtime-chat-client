import classes from './Message.module.css'




const Message = ({ message, name }) => {
    let isSentByCurrentUser = false

    const trimmedName = name.trim().toLowerCase()

    const user = message.user

    if(user === trimmedName){
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser ? (
            <div className={classes['message__owner']}>
                <p className={classes['message-sender__owner']}>{trimmedName}</p>
                <p className={classes['message-text__owner']}>{message.text}</p>
            </div>
        ) : (
            <div className={classes['message']}>
                <p className={classes['message-sender']}>{user}</p>
                <p className={classes['message-text']}>{message.text}</p>
            </div>
        )
    )
}

export default Message