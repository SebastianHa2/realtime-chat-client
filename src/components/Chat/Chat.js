import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import classes from './Chat.module.css'

let socket 

const Chat = ({ location }) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('Vermilion')
    const [message, setMessage] = useState([])
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:8080'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {

        })

        // clean-up function
        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(prevMessages => {
                return [...prevMessages, message]
            })
        })
    }, [messages])

    // Function for sending messages

    return(
        <div className={classes['chat-page']}>
            <div className={classes['chat-page__user-list-container']}>
                <h2 className={classes['user-list__heading']}>Users Present</h2>
                <ul className={classes['user-list']}>
                    <li className={classes['user-list__user']}>Sebastian</li>
                    <li className={classes['user-list__user']}>Agata</li>
                </ul>
            </div>
            <div className={classes['chat-page__chat-container']}>
                <div className={classes['chat-container__chat-output']}>
                    
                </div>
                <div className={classes['chat-container__input']}>
                    <input type="text" placeholder="Send a message" />
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat