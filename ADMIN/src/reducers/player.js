import TYPE from '../actions/action_type.js';
/**
 * state is arr container obj type : 
 * {
 *      name : name_player,
 *      profile : url_img
 * }
 */
export default function PlayerReducer(state = [] , action) {
    switch (action.type) {
        case TYPE.INITIAL_CONNECT_LST_PLAYER_ROOM:
            return action.payload;
        case TYPE.ADD_PLAYER_TO_ROOM:
            const data = action.payload;
            return {...state, data };
        default:
            return state;
    }
}