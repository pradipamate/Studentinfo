import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootreducer from '../reducers/RootReducer';


export default()=>{
    const store = createStore(rootreducer,applyMiddleware(thunk));
    return store;
}

