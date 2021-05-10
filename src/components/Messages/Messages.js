import classes from './Messages.module.css'

import Message from './Message'

const Messages = ({messages, name}) => {
    return (
        <div className={classes['messages-container']}>
            {messages.map((message, index) => {
                return <div key={index}>
                    <Message message={message} name={name}></Message>
                </div>
            })}
        </div>
    )
}

export default Messages