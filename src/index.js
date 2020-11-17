import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Mystore from './Componenet/store/store';
import {Provider} from 'react-redux';

const store = Mystore();

const jsx= (
    <Provider store={store}>
       <App />          
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react';
// import ReactDOM from 'react-dom';

// const element=<h1>welcome to Website</h1>

// ReactDOM.render(element,document.getElementById('root'));