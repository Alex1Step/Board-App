import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { FirebaseDatabaseProvider } from '@react-firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyAgTJyexl3AhXyoRfnB6LSyv0ZBoaP3Nm8',
    authDomain: 'boards-bce03.firebaseapp.com',
    databaseURL: 'https://boards-bce03-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'boards-bce03',
    storageBucket: 'boards-bce03.appspot.com',
    messagingSenderId: '804491078740',
    appId: '1:804491078740:web:81037601ec549b652d51c1',
    measurementId: 'G-HC19MRPZMS',
};

const app = (
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
            <Provider store={store}>
                <BrowserRouter>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </BrowserRouter>
            </Provider>
        </FirebaseDatabaseProvider>
    </FirebaseAuthProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
