import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
// import axios from 'axios';

// import { URL } from '../../../config';
import styles from './newsList.css';
import Button from '../../widgets/Buttons/buttons';
import CardInfo from '../../widgets/CardInfo/cardInfo';

import { fb_teams, fb_articles, firebaseLooper } from '../../../firebase';

class NewsList extends Component {
    state = {
        items: [],
        teams: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {
        if(this.state.teams.length < 1) {
            fb_teams.once('value')
                .then((snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })

            // axios.get(`${URL}/teams`)
            //     .then(response => {
            //         this.setState({
            //             teams: response.data
            //         })
            //     })
            //     .catch(error => {
            //     });
        }

        fb_articles.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const articles = firebaseLooper(snapshot);
                this.setState({
                    items: [...this.state.items, ...articles],
                    start: start,
                    end: end                    
                })
            })

        // axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
        // .then(response => {
        //     this.setState({
        //         items: [...this.state.items, ...response.data],
        //         start: start,
        //         end: end

        //     })
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }

    renderNews = (type) => {
        let template = null;

        switch(type) {
            case('card'):
                template = this.state.items.map((item,i) => (
                    <CSSTransition
                        classNames={{
                            enter:  styles.newlist_wrapper,
                            enterActive: styles.newlist_wrapper_active
                        }}
                        timeout={500}
                        key={i}>
                        <div>
                            <div className={styles.newlist_item}>
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo 
                                        teams={this.state.teams}
                                        team={item.team}
                                        date={item.date}/>
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>
                    </CSSTransition>
                ));
                break;
            
            case('cardWithImage'): 
                template = this.state.items.map((item,i) => (
                <CSSTransition
                    classNames={{
                        enter:  styles.newlist_wrapper,
                        enterActive: styles.newlist_wrapper_active
                    }}
                    timeout={500}
                    key={i}>
                    <div>
                        <Link to={`/articles/${item.id}`}>
                            <div className={styles.flex_wrapper}>
                                <div className={styles.left}
                                    style={{
                                        background: `url(/images/articles/${item.image}`
                                    }}>
                                    <div></div>
                                </div>
                                <div className={styles.right}>
                                    <CardInfo 
                                        teams={this.state.teams}
                                        team={item.team}
                                        date={item.date}/>
                                    <h2>{item.title}</h2>
                                </div>
                            </div>                                
                        </Link>
                    </div>
                </CSSTransition>
            ));

                break;

            default:
                template = null;
                break;
        }

        return template;
    };

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    render() {

        return(
            <div>
                <TransitionGroup
                    component="div"
                    className="">
                    {this.renderNews(this.props.type)}
                </TransitionGroup>

                <Button
                    type="loadmore"
                    loadMore={() => this.loadMore()}
                    cta="Load More News"/>
            </div>
        );
    }
} 

export default NewsList