import React, { useState } from 'react'
import  { Link } from 'react-router-dom'
import classes from './Join.module.css'

const Join = () => {
    const [nameInput, setNameInput] = useState('')
    const [roomChoice, setRoomChoice] = useState(null)

    return(
        <div className={classes['join-page']}>
            <div className={classes['join-page__left-side']}>

            </div>
            <div className={classes['join-page__right-side']}>
                <form className={classes['join-page__form']}>
                    <div className={classes['join-page__input-group']}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className={classes['join-page__input-group']}>
                        <label htmlFor="room">Choose a room: </label>
                        <select name="room" id="room">
                            <option value="vermilion">Vermilion</option>
                            <option value="lavender">Lavender</option>
                        </select>
                    </div>

                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>
    )
}

export default Join