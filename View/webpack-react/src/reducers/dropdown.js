import TYPE from '../actions/action_type.js';
export default function DropdownReducer(state = {}, action) {
    switch (action.type) {
        case TYPE.IDENTIFIER_CLICK_DROPDOWN:
            if(state.active != action.payload.active)
                return action.payload;
            return {};
        default:
            return {};
    }
}