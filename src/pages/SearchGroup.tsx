import React, { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import IconButton from '@mui/material/IconButton'

const SearchGroup: React.FC = () => {

    const navigation = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useLayoutEffect(() => {
        axios
            .get('/user/check-login')
            .then((res) => {
                if (res.data === "No token") {
                    setIsLogin(false);
                    navigation('/login');
                } else {
                    setIsLogin(true);
                }
            }).catch(() => {
                navigation('/login');
            });
    });

    if (isLogin) {
        return (
            <div>
                <Header />
                <IconButton />
            </div>
        )
    } else {
        return null;
    }
}

export default SearchGroup;