import React from 'react';
import s from './loader.module.css';
import img from './loader.gif';

const Loader = () => {
  return (
    <>
      <img src={img} className={s.img}/>
    </>
  )
};

export default Loader;