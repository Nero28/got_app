import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharactersPage from '../pages/charactersPage/charactersPage';
import gotService from '../../services/gotService';
import HousesPage from '../pages/housesPage/housesPage';
import BooksPage from '../pages/booksPage/booksPage';
import BooksItem from '../pages/booksItem.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {char}
                                <Button color="info" onClick={this.onToggleRandomItem}
                                >Toggle random char</Button>
                            </Col>

                        </Row>
                        <Route path='/characters' component={CharactersPage} />
                        <Route path='/houses' component={HousesPage} />
                        <Route path='/books' exact component={BooksPage} />
                        <Route path='/books/:id' render={
                            ({ match }) => {
                                const { id } = match.params;
                                return <BooksItem bookId={id} />
                            }} />
                    </Container>
                </div>
            </Router>
        );
    }
};