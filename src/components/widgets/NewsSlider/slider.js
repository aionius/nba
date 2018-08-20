import React, { Component } from 'react';
import axios from 'axios';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {
        axios.get(`http://localhost:5000/articles?_start=0&_end=3`)
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
                type="featured"/>
        );
    }
}

export default NewsSlider;