import React, { Component } from 'react';
import NewsList from '../../widgets/NewsList/newsList';
import NewsSlider from '../../widgets/NewsSlider/slider';

class news extends Component {
    render() {
        return (
            <div>
                <NewsSlider
                    type="featured"
                    start={0}
                    amount={3}
                    settings={{
                        dots: false,
                    }}
                />
                <NewsList 
                    type="cardWithImage"
                    loadmore={true}
                    start={0}
                    amount={10}/>
            </div>
        )
    }
} 

export default news;