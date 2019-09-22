import TYPE from '../actions/action_type.js';
export default function SocketReducer(state = null , action) {
    switch (action.type) {
        case TYPE.INITIIALSOCKET:
            return action.payload
        default:
            return state;
    }
}