import todoAction from '../action/todoAction';
import * as firebase from 'firebase';

// let db = firebase.database().ref('/');


export default class TodoMiddleware {
     
    
    static asyncAddTodos(data){
        console.log("testing :", data);
        return (dispatch)=>{
            dispatch(todoAction.addTodo(data));
        }
    }
    static asyncDeleteTodos(key){
        console.log(key);
        firebase.database().ref('/todos/'+key).remove();
         return (dispatch)=>{
            dispatch(todoAction.deleteTodo(key));
        }
    }
    static asyncEditTodos(key,data){
        console.log(key);
        firebase.database().ref('/todos/'+key).child('todo').set(data);
         return (dispatch)=>{
            dispatch(todoAction.editTodo(key,data));
        }
    }
}