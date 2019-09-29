const USER_INITIAL = {
    access : null,
    id : null,
    refesh : null,
    user_infor : null
};



import TYPE from '../actions/action_type.js';
export default function UserReducer(state = USER_INITIAL, action) {
    switch (action.type) {
        case TYPE.INITIIAL:
            return action.payload;
        default:
            return state;
    }
}