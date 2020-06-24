import React, { Component } from 'react';
import ItemDetails, { Field } from '../../components/itemDetails/itemDetails';
import gotService from '../../services/gotService';


export default class BooksItem extends Component {
    gotService = new gotService();

 
    render() {
        return (
            <ItemDetails itemId={this.props.bookId}
                getMethod={this.gotService.getBook}>
                <Field field='isbn' label='ISBN' />
                <Field field='authors' label='Authors' />
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publiser' label='Publiser' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}

