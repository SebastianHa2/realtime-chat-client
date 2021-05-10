import React, { useState } from 'react'
import  { Link } from 'react-router-dom'
import classes from './Join.module.css'

const Join = () => {
    const [nameInput, setNameInput] = useState('')
    const [roomChoice, setRoomChoice] = useState('Vermilion')
    const [isTouched, setIsTouched] = useState(false)

    const usernameChangeHandler = event => {
        setNameInput(event.target.value)
    }

    const roomChoiceChangeHandler = event => {
        setRoomChoice(event.target.value)
    }

    const nameInputBlurHandler = () => {
        setIsTouched(true)
    }

    const clearErrorHandler = () => {
        setIsTouched(false)
    }

    const enterRoomHandler = event => {
        if(nameInputTooShort) {
            event.preventDefault()
            return
        }
    }

    const nameInputTooShort = isTouched && nameInput.trim().length < 3
    const nameInputClasses = nameInputTooShort ? 'invalid' : ''
 
    return(
        <div className={classes['join-page']}>
            <h1 className={classes['join-page__heading']}>Chat In Peace</h1>
            <div className={classes['join-page__left-side']}>

            </div>
            <div className={classes['join-page__right-side']}>
                <div className={classes['join-page__credentials']}>
                    <div className={classes['join-page__input-group']}>
                        <label htmlFor="username">Username</label>
                        <input className={classes[nameInputClasses]} type="text" id="username" onChange={usernameChangeHandler} onFocus={clearErrorHandler} onBlur={nameInputBlurHandler} />
                        {nameInputTooShort && <p>Username must be at least 3 characters long</p>}
                    </div>
                    <div className={classes['join-page__input-group']}>
                        <label htmlFor="room">Choose a room: </label>
                        <select name="room" id="room" onChange={roomChoiceChangeHandler}>
                            <option value="vermilion">Vermilion</option>
                            <option value="lavender">Lavender</option>
                            <option value="viridian">Viridian</option>
                        </select>
                    </div>
                    <Link to={`/chat?name=${nameInput}&room=${roomChoice}`} onClick={enterRoomHandler}> 
                        <button>Enter</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Join