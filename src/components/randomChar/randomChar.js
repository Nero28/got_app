import React, { Component } from 'react';
import './randomChar.module.css';
import gotService from '../../services/gotService';
import Loader from '../loader/loader.js';
import ErrorMessage from '../errorMessage/errorMessage.js';
import PropTypes from 'prop-types';

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false,
    }
    static propsTypes = {
        interval: PropTypes.number
    }

    static defaultProps = {
        interval: 15000
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        });
    }


    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        //const id =1300000;
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        console.log('render');

        const { char, loading, error } = this.state;


        const errorMessage = error ? <ErrorMessage /> : null;
        const loader = loading ? <Loader /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;


        return (
            <div className="random-block rounded">
                {errorMessage}
                {loader}
                {content}
            </div>
        );
    }
}



const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}