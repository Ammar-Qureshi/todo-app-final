import React, { Component } from 'react'


export default class Table extends Component {
    render() {
        return (
            <div>
                <table>

                    <tbody>

                        {
                            Object.keys(this.props.todoArr).map((key) => {
                                return (
                                    <tr id={key}>
                                        <td >
                                            <input disabled="disabled" type="text" value={this.props.todoArr[key].todo} id={key + "txt"} />
                                            {/*<input disabled="disabled" type="text" value={this.state.todos[key].todo} id={key + "txt"} />*/}
                                            {
                                                console.log(key, this.state)
                                            }
                                        </td>
                                        <td >{this.props.todoArr[key].done.toString()}</td>
                                        <td >
                                            <button onClick={this.editItem.bind(this)}>Edit</button>
                                        </td>
                                        <td >
                                            <button onClick={this.deleteItem.bind(this)}>Del</button>
                                        </td>
                                        {/*{console.log(this.props.todoArr[key].done)}*/}
                                    </tr>
                                );
                            })

                        }

                    </tbody>
                </table>
            </div>
        );
    }
}
