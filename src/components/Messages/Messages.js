import classes from './Messages.module.css'

import Message from './Message'
import { useEffect } from 'react'

const Messages = ({messages, name}) => {
    useEffect(() => {
        const messageContainer = document.getElementById('message-container')
        messageContainer.scrollTop = messageContainer.scrollHeight
    }, [messages])

    return (
        <div id="message-container" className={classes['messages-container']}>
            {messages.map((message, index) => {
                return <div key={index}>
                    <Message message={message} name={name}></Message>
                </div>
            })}
        </div>
    )
}

export default Messages