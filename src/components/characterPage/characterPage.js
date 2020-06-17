import React, { Component } from 'react';
import './characterPage.module.css';
import { Col, Row } from 'reactstrap';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import ErrorMessage from '../errorMessage/errorMessage';


export default class CharacterPage extends Component {
    state = {
        selectedChar: 130,
        error:false,
    }


    onCharSelected = (id) => {
        this.setState({ 
            selectedChar: id
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
        return (
            <>
                <Row>
                    <Col md='6'>
                        <ItemList onCharSelected={this.onCharSelected} />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar} />
                    </Col>
                </Row>
            </>
        )
    }
}

