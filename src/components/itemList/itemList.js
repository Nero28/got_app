import React, { Component, useState, useEffect } from 'react';
import './itemList.module.css';
import Loader from '../loader/loader.js';
import ErrorMessage from '../errorMessage/errorMessage.js';
import PropTypes from 'prop-types';
import gotService from '../../services/gotService';
import withData from '../withData/withData';

const ItemList = ({ getData, onItemSelected, renderItem }) => {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })

    },[])

    ItemList.defaultProps = {
    onItemSelected: () => { }
}

    ItemList.propTypes = {
    onItemSelected: PropTypes.func
}


const renderItems=(arr) =>{
    return arr.map((item) => {
        const { id } = item;
        const label = renderItem(item);
        return (
            <li
                key={id}
                className="list-group-item"
                onClick={() => onItemSelected(id)}
            >
                {label}
            </li>
        )
    })
}


    if (!itemList) {
        return <Loader />
    }
    const items = renderItems(itemList);
    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

};

export default ItemList;