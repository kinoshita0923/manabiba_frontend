import React from 'react'   
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import FilledInput from '@mui/material/FilledInput'
import classes from '../styles/Signup.module.css'

const buttonStyle = {
    display: 'block',
    width: '25vw',
    maxWidth: '350px',
    height: '5vh',
    margin: 'auto',
    marginButtom: '2vh'
}

const inputStyle = {
    display: 'block',
    width: '30vw',
    maxWidth: '400px',
    height: '5vh',
    margin: '4vh auto',
}

const Signup: React.FC = () => {
    return (
        <div className={classes.background}>
            <div className={classes.page}>
                <div className={classes.inputs_box}>
                    <img src="./manabiba.png" className={classes.logo} />
                    <h1 className={classes.title}>manabiba Signup</h1>
                    <FilledInput placeholder='User Name' sx={inputStyle} required />
                    <FilledInput placeholder='Email' sx={inputStyle} required />
                    <FilledInput placeholder='Password' sx={inputStyle} required />
                    <Button variant="contained" sx={buttonStyle} >LogIn</Button>
                    <Link to="/login" className={classes.login_link}>ログイン</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup