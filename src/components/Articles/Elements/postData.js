import React from 'react';
import moment from 'moment';

import styles from '../articles.css';

const formatDate = (date) => {
    return moment(date).format('MM-DD-YYYY')
}

const postData = (props) => (
    <div className={styles.articlePostData}>
        <div>
            {/* Date: <span>{props.data.date}</span> */}
            Date: <span>{formatDate(props.data.date)}</span>
        </div>
        <div>
            Author: <span>{props.data.author}</span>
        </div>
    </div>
);

export default postData;