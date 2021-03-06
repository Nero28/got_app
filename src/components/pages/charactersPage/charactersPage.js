import React, { Component } from 'react';
import './charactersPage.module.css';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';
//import withData from '../../withData/withData';


export default class CharactersPage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: null,
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
        const itemList = <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllCharacters}
            renderItem={({ name, gender }) => `${name} (${gender})`} />;

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                getMethod={this.gotService.getCharacter}
            >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}

