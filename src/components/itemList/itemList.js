import React, { Component } from 'react';
import './itemList.module.css';
import gotService from '../../services/gotService.js';
import Loader from '../loader/loader.js';
import ErrorMessage from '../errorMessage/errorMessage.js';

export default class ItemList extends Component {
    gotService = new gotService();


    state = {
        charList: null,
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({ charList })
            })
    }


    renderItems(arr) {
        return arr.map((item, i) => {
            return (
                <li
                    key={i}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41+i)}
                >
                    {item.name}
                </li>
            )
        })
    }


    render() {
        const { charList } = this.state;
        if (!charList) {
            return <Loader />
        }

        const items = this.renderItems(charList);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}