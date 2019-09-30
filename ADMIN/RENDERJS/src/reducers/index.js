import {combineReducers} from 'redux';

///thêm các reducer funtion cần được combine vào đây
import UserReducer from './user.js';
import DetectClientReducer from "./detect.js";
import ConfigReducer from "./config.js"
//// khởi tạo 1 biến biểu diễn REDUCER ALL 
const Reducer = combineReducers({
    client : DetectClientReducer,
    authentication : UserReducer,
    config : ConfigReducer
});
export default Reducer;