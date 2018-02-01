import todoItem from './reducer/todoItem';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const middleware = applyMiddleware(thunk);
const store = createStore(todoItem, middleware);

export default store;