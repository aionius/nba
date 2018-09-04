import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhXvyCrtQPXluUbsnj_z3X0-Zs6fzdXJA",
    authDomain: "nba-react-93867.firebaseapp.com",
    databaseURL: "https://nba-react-93867.firebaseio.com",
    projectId: "nba-react-93867",
    storageBucket: "nba-react-93867.appspot.com",
    messagingSenderId: "1060127864592"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();

const fb_articles = firebaseDB.ref('articles');
const fb_teams = firebaseDB.ref('teams');
const fb_videos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    });
    return data;
}

export {
    firebase,
    firebaseDB,
    fb_articles,
    fb_videos,
    fb_teams,
    firebaseLooper
}