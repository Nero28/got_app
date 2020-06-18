import React, { Component } from 'react';
import './bookPage.module.css';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class BookPage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: 1,
        error: false,
    }


    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
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
        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        );

        const charDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                getMethod={this.gotService.getBook}>
                <Field field='isbn' label='ISBN' />
                <Field field='authors' label='Authors' />
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publiser' label='Publiser' />
                <Field field='released' label='Released' />
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}

