const USER_INITIAL =  [
    { id: 1, name : "hùng" },
    { id: 2, name : "đẹp" },
    { id: 3, name : "trai" }
];

import TYPE from '../actions/action_type.js';
export default function UserReducer(state = USER_INITIAL, action) {
    switch (action.type) {
        case TYPE.CLICK_DEMO:
            return state.filter(
                ( item ) => item.id % 2 == 0 
            );
        default:
            return state;
    }
}