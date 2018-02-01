import React, { Component } from 'react';
// import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const txt = {
    input: {
        paddingTop : 15
    },
    cont:{
        paddingTop:15
    },
    buttn:{
        marginTop:20
    }

}

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
        }

    }
    changeValue(event) {
        this.setState({
            inputVal: event.target.value
        })
    }
    addTodo() {
        // this.state.todo.push({ todo: this.state.inputVal });
        // console.log(this.state.todo);
        this.setState({
            inputVal: ''
        });

        // console.log(this)
        this.props.addValue({ todo: this.state.inputVal });
    }
    render() {
        return (

            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-6" style={txt.cont}>
                    <TextField
                        id="text-field-default"
                        placeholder="Todo Value"
                        fullWidth={true}
                        value={this.state.inputVal}
                        onChange={this.changeValue.bind(this)}
                    />
                </div>
                <div className="col-sm-3">
                    <FlatButton style={txt.buttn} label="ADD"  fullWidth={true} onClick={this.addTodo.bind(this)} />
                </div>
            </div>
        );
    }
}

export default Todo;