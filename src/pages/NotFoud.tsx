import React from "react";
import { Helmet } from "react-helmet";
import classes from '../styles/NotFound.module.css'

const NotFound: React.FC = () => {
    return (
        <div className={classes.background}>
            <Helmet>
                <title>manabiba Not Found</title>
            </Helmet>

            <div className={classes.page}>
                <div className={classes.message_box}>
                    <img src="./manabiba.png" className={classes.logo} />
                    <h1 className={classes.title}>
                        404 <br/>
                        Not Found
                    </h1>
                    <p className={classes.description}>お探しのページが見つかりませんでした。</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;