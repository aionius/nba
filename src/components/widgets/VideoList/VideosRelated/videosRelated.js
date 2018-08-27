import React from 'react';

import styles from '../videoList.css';
import VideoListTemplate from '../videosList_template';

const videosRelated = (props) => (
    <div className={styles.relatedWrapper}>
        <VideoListTemplate 
            data={props.data}
            teams={props.teams}/>
    </div>
);

export default videosRelated;