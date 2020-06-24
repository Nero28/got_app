import React, { Component } from 'react';
import './booksPage.module.css';
import ItemList from '../../itemList/itemList';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import { withRouter } from 'react-router-dom';
//import withData from '../../withData/withData';



class BooksPage extends Component {
    gotService = new gotService();

    state = {
        error: false,
    }


    componentDidCatch() {
        this.setState({
            error: true,
        })
    }



    render() {
        const { error } = this.state;
        if (error) {
            return <ErrorMessage />
        }

        return <ItemList
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({ name, gender }) => `${name} (${gender})`} />

    }
}

export default withRouter(BooksPage);

