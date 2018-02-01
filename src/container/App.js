import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Todo from '../components/Todo';
// import TextField from 'material-ui/TextField';
// import todoAction from '../store/action/todoAction';
import TodoMiddleware from '../store/middlewares/todoMiddleware';
// import logo from './logo.svg';
// import './App.css';
import * as firebase from 'firebase';





// Initialize Firebase
var config = {
  apiKey: "AIzaSyCuzkSwAisZQV-luj-S5AcJdUbFExqRN9o",
  authDomain: "todo-f653b.firebaseapp.com",
  databaseURL: "https://todo-f653b.firebaseio.com",
  projectId: "todo-f653b",
  storageBucket: "",
  messagingSenderId: "132224836610"
};
firebase.initializeApp(config);




function fetchStoreData(state) {
  return {
    todoArr: state
  }
}
function sendDataToStore(dispatch) {
  return {
    addtotodo: (val) => {
      dispatch(TodoMiddleware.asyncAddTodos(val));
    },
    deletetotodo: (key) => {
      dispatch(TodoMiddleware.asyncDeleteTodos(key));
    },
    edittodo: (key, data) => {
      dispatch(TodoMiddleware.asyncEditTodos(key, data));
    }

  }
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // todos: {}
    }
    firebase.database().ref('/todos').on('child_added', (data) => {
      let obj = data.val();
      obj.key = data.key;
      // let currentTodos = this.props.todos;
      // currentTodos = currentTodos.concat(obj)
      this.props.addtotodo(obj);
      let todo = {};
      todo[obj.key] = obj;
      // this.setState({
      //  todos : Object.assign({},this.state.todos,todo) 
      // })
      this.setState({
        [obj.key]: obj
      })



      // console.log(this.state.todos)
    });

    // this.setState({this.props.todoArr})
  }
  addingValue(data) {
    // this.props.addtotodo(val);
    firebase.database().ref('/').child('todos').push(data).then((val) => {
      console.log(val.key, data);
      data.key = val.key;
    });
    // console.log(val)
  }
  editItem(event) {
    let inputField = event.target.parentNode.parentNode.firstChild.firstChild;
    let key = event.target.parentNode.parentNode.id;
    if (event.target.innerHTML === "Edit") {
      event.target.innerHTML = "Save";
      // inputField.disabled = true;
      inputField.removeAttribute("disabled");
      // inputField.value = null;

    } else {
      event.target.innerHTML = "Edit";
      this.props.edittodo(key, inputField.value)
      inputField.setAttribute("disabled", "disabled");
    }
    console.log(inputField);
  }
  changingValue(event) {
    let key = event.target.parentNode.parentNode.id;
    let obj = this.state[key];
    obj.todo = event.target.value;
    console.log(obj);
    this.setState({
      [key]: Object({}, this.state[key], obj)
    })
    console.log(event.target.parentNode.parentNode.id);
  }
  deleteAllTodos() {
    Object.keys(this.state).map((key) => {
      return this.props.deletetotodo(key);
    });
  }
  deleteItem(event) {
    console.log(event.target.parentNode.parentNode.id);
    let key = event.target.parentNode.parentNode.id;
    this.props.deletetotodo(key);
  }
  render() {
    return (
      <MuiThemeProvider>

        <div className="container-fluid">
          <div class="col-lg-4 col-lg-offset-4">
            <h1>TODO APP</h1>
            {/* <i classNamen="fas fa-clipboard">set your priorities</i> */}
          </div>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8 bg-light rounded">
              <div className="text-center" >
                <Todo addValue={this.addingValue.bind(this)} />
              </div>
              {console.log(Object.keys(this.state))}
              <button class="btn btn-warning btn-lg btn-block" onClick={this.deleteAllTodos.bind(this)}>Delete All</button>

              <table class="table table-bordered">

                <tbody>

                  {
                    Object.keys(this.props.todoArr).map((key) => {
                      return (
                        <tr id={key}>
                          <td >
                            {/*<input disabled="disabled" type="text" value={this.props.todoArr[key].todo} id={key + "txt" } onChange={this.changingValue.bind(this)} />*/}
                            <input class="form-control" disabled="disabled" type="text"
                              onChange={this.changingValue.bind(this)}
                              value={

                                (this.state[key]) ? this.state[key].todo : ''
                              } id={key + "txt"} />
                          </td>
                          <td class="text-center">
                            <button class="btn btn-info btn-block " onClick={this.editItem.bind(this)}>EDIT</button>
                          </td>
                          <td class="text-center" >
                            <button class="btn btn-danger btn-block" onClick={this.deleteItem.bind(this)}>DELETE</button>
                          </td>
                          {/*{console.log(this.props.todoArr[key].done)}*/}
                        </tr>
                      );
                    })

                  }

                </tbody>
              </table>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>



      </MuiThemeProvider>
    );
  }
}

export default connect(fetchStoreData, sendDataToStore)(App);
