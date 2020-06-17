import React from 'react';
import s from './errorMessage.module.css';
import img from './error.jpeg';

const ErrorMessage = () => {
    return (
        <>
            <img src={img} className={s.img} />
            <span className={s.span}>
                <h2> Something goes wrong!</h2>
            </span>
        </>
    )
};

export default ErrorMessage;