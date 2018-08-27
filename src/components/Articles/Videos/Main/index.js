import React from 'react';

import VideoList from '../../../widgets/VideoList/videoList';

const videos = () => {
    return (
        <div>
            <VideoList
                type="card"
                title={false}
                loadmore={true}
                start={0}
                amount={10}/>
        </div>
    )
}

export default videos;