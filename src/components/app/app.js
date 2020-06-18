import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../pages/characterPage/characterPage';
import gotService from '../../services/gotService';
import HousePage from '../pages/housePage/housePage';
import BookPage from '../pages/bookPage/bookPage';

export default class App extends React.Component {

    gotService = new gotService();

    state = {
        toggleVisibleRandomItem: true,
        error: false,
    }


    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true,
        })
    }

    onToggleRandomItem = () => {
        this.setState((state) => {
            return {
                toggleVisibleRandomItem: !state.toggleVisibleRandomItem,

            }
        })
    }


    render() {
        const { toggleVisibleRandomItem, error } = this.state;
        if (error) {
            return <ErrorMessage />
        }
        const char = toggleVisibleRandomItem ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button color="info" onClick={this.onToggleRandomItem}
                            >Toggle random char</Button>
                        </Col>

                    </Row>
                    <CharacterPage />
                    <HousePage />
                    <BookPage />
                </Container>
            </>
        );
    }
};