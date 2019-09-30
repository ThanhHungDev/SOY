///định nghĩa các action creator
import TYPE from './action_type.js';
//// ví dụ
////nghĩa là nhiệm vụ không phải là action thực thi,
/// action này là 1 obj để định hình cách thực thi
export function actionJobClickDemo(data){
    return {
        type: TYPE.CLICK_DEMO,
        payload: data.target.id
    }
}
export function actionInitialUser( data ){
    return {
        type : TYPE.INITIIAL,
        payload : data
    }
}
export function actionResetUserNull(){
    return {
        type : TYPE.RESET_USER_NULL
    }
}