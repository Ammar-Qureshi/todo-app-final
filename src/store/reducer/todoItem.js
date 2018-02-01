import todoAction from '../action/todoAction';
// import firebase from 'firebase';

let intialState = {};
function todoItem(state = intialState, action) {
    switch (action.type) {
        case todoAction.ADDTODO:
            return Object.assign({}, state, { [action.val.key]: action.val });
        case todoAction.DELETETODO:
            // delete state[action.key];
            let clone = Object.assign({}, state);
            delete clone[action.key];
            console.log("phonch gaya ", action.key);
            return clone;
        case todoAction.EDITTODO:
            let obj = Object.assign({}, state);
            obj[action.key].todo = action.inputval;
            return obj;
        default:
            return state;
    }
}

export default todoItem;