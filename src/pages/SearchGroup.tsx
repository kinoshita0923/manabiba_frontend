import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Header from '../components/Header'

const SearchGroup: React.FC = () => {

    const navigation = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
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
    }, []);

    if (isLogin) {
        return (
            <div>
                <Helmet>
                    <title>manabiba search group</title>
                </Helmet>

                <Header />
            </div>
        )
    } else {
        return null;
    }
}

export default SearchGroup;