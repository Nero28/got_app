import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';


export default class App extends React.Component {


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
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button color="info" onClick={this.onToggleRandomChar}
                            >Toggle random char</Button>
                        </Col>

                    </Row>
                    <CharacterPage />
                </Container>
            </>
        );
    }
};