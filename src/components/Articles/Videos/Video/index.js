import React, { Component } from 'react';
// import axios from 'axios';

// import { URL } from '../../../../config';
import styles from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideoList/VideosRelated/videosRelated';
import { firebaseDB, firebaseLooper, fb_teams, fb_videos } from '../../../../firebase';

class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentWillMount() {
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
            .then((snapshot) => {
                let article = snapshot.val();

                fb_teams.orderByChild('id').equalTo(article.team).once('value')
                    .then((snapshot) => {
                        const team = firebaseLooper(snapshot);

                        this.setState({
                            article,
                            team
                        });
                    })
                    .catch(error => {

                    });
            })
            .catch(error => {
                console.log(error);
            });


        // axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        //     .then(response => {
        //         let article = response.data[0];

        //         axios.get(`${URL}/teams?id=${article.team}`)
        //             .then(response => {
        //                 this.setState({
        //                     // in ES6, if the variable declared is same
        //                     // with the state variable, you can just set that
        //                     // variable
        //                     // article: article,
        //                     article,
        //                     team: response.data
        //                 })
        //                 this.getRelated();
        //             })

        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    getRelated = () => {

        fb_teams.once('value')
            .then((snapshot) => {
               
                const teams = firebaseLooper(snapshot);
             
                fb_videos
                    .orderByChild('team')
                    .equalTo(this.state.article.team)
                    .limitToFirst(3).once('value')
                    .then((snapshot) => {
                        const related = firebaseLooper(snapshot);
                        this.setState({
                            teams,
                            related
                        })
                    })
            })

        // axios.get(`${URL}/teams`)
        //     .then(response => {
        //         let teams = response.data;
        //         console.log(this.state.team)
        //         axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //             .then(response => {
        //                 console.log(response.data);

        //                 this.setState({
        //                     teams,
        //                     related: response.data
        //                 })
        //             })
        //             .catch(error => {
        //                 console.log(error);
        //             })
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    render() {
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div>
                <Header teamData={team[0]}/>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                        ></iframe>
                </div>
                <VideosRelated 
                    data={this.state.related}
                    teams={this.state.teams}/>
            </div>
        )
    }
  
}

export default VideoArticle;