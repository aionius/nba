import React, { Component } from 'react';
import axios from 'axios';

import SliderTemplates from './slider_templates';
import { URL } from '../../../config';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
            .then(response => {
                this.setState({
                    news: response.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return(
            <SliderTemplates 
                newsData={this.state.news}
                type={this.props.type}
                settings={this.props.settings}/>
        );
    }
}

export default NewsSlider;