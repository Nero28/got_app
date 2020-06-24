import React, { Component } from 'react';
import Loader from '../loader/loader.js';
import ErrorMessage from '../errorMessage/errorMessage.js';
import PropTypes from 'prop-types';
 



const withData = (View, getData) => {
    return class extends Component {
        state = {
            data: null,
        }


        componentDidMount() {
            getData()
                .then((data) => {
                    this.setState({ data })
                })
        }


        render() {
            const { data } = this.state;
            if (!data) {
                return <Loader />
            }
            return <View {...this.props} data={data} />
        }
    }
};

//const { getData } = new gotService();
export default withData();