import React, { Component } from 'react';
import './housePage.module.css';
import ItemList from '../../itemList/itemList';
import ItemDetails, { Field } from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock/rowBlock';

export default class HousePage extends Component {
    gotService = new gotService();

    state = {
        selectedItem: 130,
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
                getData={this.gotService.getAllHouses}
                renderItem={({ name, region }) => ` ${name} (${region}) `} />
        );

        const itemDetails = (
            <ItemDetails itemId={this.state.selectedItem}
                getMethod={this.gotService.getHouse} >
                <Field field='region' label='Region' />
                <Field field='coatOfArms' label='CoatOfArms' />
                <Field field='words' label='Words' />
                <Field field='overloard' label='Overloard' />
            </ItemDetails>
        );

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}

