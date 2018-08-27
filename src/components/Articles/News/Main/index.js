import React from 'react';

import NewsList from '../../../widgets/NewsList/newsList';
import NewsSlider from '../../../widgets/NewsSlider/slider';

const news = () => (
    <div>
        <NewsSlider
            type="featured"
            start={0}
            amount={3}
            settings={{
            dots: false,
        }}/>
        <NewsList 
            type="cardWithImage"
            loadmore={true}
            start={3}
            amount={10}/>
    </div>
)

export default news;