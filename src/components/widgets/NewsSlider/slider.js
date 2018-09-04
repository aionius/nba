import React, { Component } from 'react';
import { fb_articles, firebaseLooper } from '../../../firebase';

import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news: []
    }

    componentWillMount() {

        fb_articles.limitToFirst(3).once('value')
            .then(snapshot => {

                // const news = [];
                // snapshot.forEach((childSnapshot) => {
                //     news.push({
                //         ...childSnapshot.val(),
                //         id: childSnapshot.key
                //     })
                // });

                const news = firebaseLooper(snapshot)
                this.setState({
                    news
                })
            })
      
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        //     .then(response => {
        //         this.setState({
        //             news: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
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