import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import classes from './Chat.module.css'
import Messages from '../Messages/Messages'
let socket 

const Chat = ({ location }) => {
    const [room, setRoom] = useState('Vermilion')
    const [name, setName] = useState('')
    const [message, setMessage] = useState([])
    const [messages, setMessages] = useState([])
    const [usersPresent, setUsersPresent] = useState([])
    const ENDPOINT = 'localhost:8080'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)

        // New user joins room
        socket.emit('join', { name, room }, (usersInRoom, error) => {
            setUsersPresent(usersInRoom)
        })

        return () => {
            // User leaves room
            socket.disconnect()

            socket.off()
        }
    }, [ENDPOINT, location.search])


    useEffect(() => {
        // Event listener for a welcome message
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages])

    const messageInputHandler = event => {
        setMessage(event.target.value)
    }

    useEffect(() => {
        socket.on('user-left', usersInRoom => {
            setUsersPresent(usersInRoom)
        })

        socket.on('user-joined', usersInRoom => {
            setUsersPresent(usersInRoom)
        })
    }, [usersPresent])

    // Function for sending messages
    const sendMessageHandler = event => {
        event.preventDefault()
        if(message) {
            socket.emit('message-sent', message, () => {
                setMessage('')
            })
        }
    }

    console.log(usersPresent)

    return(
        <div className={classes['chat-page']}>
            <div className={classes['chat-page__user-list-container']}>
                <h2 className={classes['user-list__heading']}>Users Present</h2>
                <ul className={classes['user-list']}>
                    {usersPresent.map(user => {
                        return <li className={classes['user-list__user']} key={user.name}>{user.name}</li>
                    })}
                </ul>
            </div>
            <div className={classes['chat-page__chat-container']}>
                <h2 className={classes['chat-container__chat-heading']}>{room}</h2>
                <div className={classes['chat-container__chat-output']}>
                    <Messages messages={messages} name={name}></Messages>
                </div>
                <div className={classes['chat-container__input']}>
                    <input type="text" placeholder="Send a message" value={message} onChange={messageInputHandler} />
                    <button onClick={sendMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat