import TYPE from '../actions/action_type.js';
const initialStateConfig = {
    register_success_to_login : false
}
export default function ConfigReducer(state = initialStateConfig , action) {
    switch (action.type) {
        case TYPE.REGISTER_FLASH_LOGIN:
            var toggle = state.register_success_to_login;
            return {...state, register_success_to_login : !toggle };
        default:
            return state;
    }
}