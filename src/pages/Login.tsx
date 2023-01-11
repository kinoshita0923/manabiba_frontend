import React, { useEffect, useState } from 'react'   
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Button, Checkbox, FilledInput } from '@mui/material';
import classes from '../styles/Login.module.css'
import axios from 'axios'

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
    fontSize: '1.5vh',
}

const params = new FormData();

const Login: React.FC = () => {

    const navigation = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target?.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target?.value);
    }

    const changeIsShowPassword = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLLabelElement>) => {
        setIsShowPassword((isShowPassword) => {
            return !isShowPassword;
        });
    }

    const login = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (email !== '' && password !== '') {
            params.append('email', email);
            params.append('password', password);

            axios
                .post('/user/authentication', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    params.delete('email');
                    params.delete('user_password');
                    navigation('/search-group');
                })
                .catch(() => {
                    params.delete('user_name');
                    params.delete('user_password');
                    alert('通信エラー');
                });
        } else {
            alert('メールアドレスもしくはパスワードが入力されていません。');
        }
    }

    useEffect(() => {
        axios
            .get('/user/check-login')
            .then((res) => {
                if (res.data !== "No token") {
                    setIsLogin(false);
                    navigation('/search-group');
                } else {
                    setIsLogin(true);
                }
            });
    }, []);

    if (isLogin) {
        return (
            <div className={classes.background}>
                <Helmet>
                    <title>manabiba login</title>
                </Helmet>
                
                <div className={classes.page}>
                    <div className={classes.inputs_box}>
                        <img src="./manabiba.png" className={classes.logo} />
                        <h1 className={classes.title}>manabiba Login</h1>
                        <FilledInput placeholder='Email' sx={inputStyle} onChange={changeEmail} required />
                        <FilledInput placeholder='Password' sx={inputStyle} type={isShowPassword ? 'text' : 'password'} onChange={changePassword} required />
                        <div className={classes.showPassword}>
                            <Checkbox id="showPassword" onChange={changeIsShowPassword} />
                            <label htmlFor="showPassword" >パスワードを表示する</label>
                        </div>
                        <Button variant="contained" sx={buttonStyle} /*onClick={login}*/ >LogIn</Button>
                        <Link to="/signup" className={classes.signup_link}>新規登録</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Login;
