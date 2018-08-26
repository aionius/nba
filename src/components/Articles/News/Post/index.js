import React, { Component } from 'react';
import axios from 'axios';

import { URL } from '../../../../config';
import styles from '../../articles.css';

class NewsArticles extends Component {

    // state = {
    //     article: [],
    //     team: []
    // }

    // componentWillMount() {
    //     console.log(this.props.match)
    //     axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
    //         .then(response => {
    //             console.log(response);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    render() {
        return(
            <div>Article view</div>
        )
    }
}

export default NewsArticles;