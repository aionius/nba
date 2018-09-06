import React, { Component } from 'react';
// import axios from 'axios';

import styles from './videoList.css';
// import { URL } from '../../../config';
import Button from '../Buttons/buttons';
import VideosTemplate from '../VideoList/videosList_template';
import { fb_teams, firebaseLooper, fb_videos } from '../../../firebase';


class VideoList extends Component {
    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    renderTitle = () => {
        return this.props.title ? 
            <h3><strong>NBA</strong> Videos</h3> 
        : null;
    }

    renderButton = () => {
        return this.props.loadmore ? 
            <Button
                type="loadmore"
                loadMore={() => this.loadMore()}
                cta="Load More Videos">
            </Button>

        : 
            <Button
                type="linkTo"
                cta="More Videos"
                linkTo="/videos">
            </Button>
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    request = (start,end) => {
        if(this.state.teams.length < 1) {

            fb_teams.once('value')
                .then((snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })
                .catch(error => {
                    console.log(error);
                })

            // axios.get(`${URL}/teams`)
            //     .then(response => {
            //         this.setState({
            //             teams: response.data
            //         })
            //     })
            //     .catch(error => {
            //         console.log(error);
            //     })
        }

        fb_videos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const videos = firebaseLooper(snapshot);
                this.setState({
                    videos: [...this.state.videos, ...videos],
                    start: start,
                    end: end
                })
            })
            .catch(error => {
                console.log(error);
            })

        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        //     .then(response => {
        //         this.setState({
        //             videos: [...this.state.videos, ...response.data],
        //             start: start,
        //             end: end
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    renderVideos = () => {
        let template = null;
        switch(this.props.type) {
            case('card'):
                 template = <VideosTemplate data={this.state.videos} teams={this.state.teams} />
                break;
            default:
                template = null;
                break;
        }

        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end+1, end);
    }

    render() {

        return(
            <div className={styles.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideoList;