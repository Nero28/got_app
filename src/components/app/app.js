import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import ItemList from '../itemList/itemList';
import ItemDetails from '../itemDetails/itemDetails';
import gotService from '../../services/gotService';

export default class App extends React.Component {

    gotService = new gotService();

    state = {
        toggleVisibleRandomChar: true,
        error: false,
    }


    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true,
        })
    }

    onToggleRandomChar = () => {
        this.setState((state) => {
            return {
                toggleVisibleRandomChar: !state.toggleVisibleRandomChar
            }
        })
    }


    render() {
        const { toggleVisibleRandomChar, error } = this.state;
        if (error) {
            return <ErrorMessage />
        }
        const char = toggleVisibleRandomChar ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button color="info" onClick={this.onToggleRandomChar}
                            >Toggle random char</Button>
                        </Col>

                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList
                             onItemSelected={this.onItemSelected}
                             getData={this.gotService.getAllBooks}
                             renderItem={(item) => item.name}
                         />
                        </Col>
                        <Col md='6'>
                            <ItemDetails itemId={this.state.selectedItem} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onItemSelected={this.onItemSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) =>item.name}
                             />
                        </Col>
                        <Col md='6'>
                            <ItemDetails itemId={this.state.selectedItem} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};