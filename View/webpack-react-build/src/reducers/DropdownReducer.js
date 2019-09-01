import TYPE from '../actions/action_type.js';
export default function DropdownReducer(state = false, action) {
    switch (action.type) {
        case TYPE.LISTEN_HIDE_DROPDOWN:
            return true;
        default:
            return false;
    }
}