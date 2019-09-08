///định nghĩa các action creator
import TYPE from './action_type.js';
//// ví dụ
////nghĩa là nhiệm vụ không phải là action thực thi,
/// action này là 1 obj để định hình cách thực thi
export function ActionClickDemo(data) {
    return {
        type: TYPE.CLICK_DEMO,
        payload: data
    }
}
export function actionJobClickDemo(data){
    return {
        type: TYPE.CLICK_DEMO,
        payload: data.target.id
    }
}
export function Dropdown(data_indetifier){
    return {
        type: TYPE.IDENTIFIER_CLICK_DROPDOWN,
        payload: data_indetifier
    }
}
export function actionInitialUser( data ){
    return {
        type : TYPE.INITIIAL,
        payload : data
    }
}