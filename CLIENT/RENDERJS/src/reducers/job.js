const JOBS_INITIAL =  [
    { id: 1, title : "cần tìm bạn gái cho hùng đẹp trai" },
    { id: 2, title : "bác sĩ tìm việc làm" },
    { id: 3, title : "khi trái tim tan vỡ cần người hàn gắn" }
];

import TYPE from '../actions/action_type.js';
export default function JobReducer(state = JOBS_INITIAL, action) {
    switch (action.type) {
        case TYPE.CLICK_DEMO:
            return state.filter(
                ( item ) => item.id != action.payload 
            );
        default:
            return state;
    }
}