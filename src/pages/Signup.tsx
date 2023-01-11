import React, { useEffect, useState } from 'react'   
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Button, Checkbox, FilledInput } from '@mui/material';
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

const regex = /^[a-zA-Z0-9.?\/-]{8,24}$/;
const params = new FormData();

const checkPassword = (password: string): boolean => {
    return regex.test(password);
}

const Signup: React.FC = () => {

    const navigation = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target?.value);
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target?.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target?.value);
    }

    const changeIsShowPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsShowPassword((isShowPassword) => {
            return !isShowPassword;
        });
    }

    const register = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        if (name === '' && email === '' && password === '') {
            alert('ユーザ名もしくはメールアドレス、パスワードが入力されていません.');
        } else if (!checkPassword(password)) {
            alert('パスワードは8文字から24文字で大文字小文字数字記号をそれぞれ含めてください。');
        } else {
            params.append('user_name', name);
            params.append('email', email);
            params.append('user_password', password);
    
            axios
                .post('/user/register', params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(() => {
                    params.delete('user_name')
                    params.delete('email');
                    params.delete('user_password');
                    navigation('/search-group');
                })
                .catch(() => {
                    params.delete('user_name');
                    params.delete('email');
                    params.delete('user_password');
                    alert('通信エラー');
                });
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
                    <title>manabiba signup</title>
                </Helmet>

                <div className={classes.page}>
                    <div className={classes.inputs_box}>
                        <img src="./manabiba.png" className={classes.logo} />
                        <h1 className={classes.title}>manabiba Signup</h1>
                        <FilledInput placeholder='User Name' sx={inputStyle} onChange={changeName} required />
                        <FilledInput placeholder='Email' sx={inputStyle} onChange={changeEmail} required />
                        <FilledInput placeholder='Password' sx={inputStyle} type={isShowPassword ? 'text' : 'password'} onChange={changePassword} required />
                        <div className={classes.showPassword}>
                            <Checkbox id="showPassword" onChange={changeIsShowPassword} />
                            <label htmlFor="showPassword" >パスワードを表示する</label>
                        </div>
                        <Button variant="contained" sx={buttonStyle} onClick={register} >SignUp</Button>
                        <Link to="/login" className={classes.login_link}>ログイン</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default Signup
