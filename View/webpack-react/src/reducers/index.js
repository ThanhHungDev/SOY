import {combineReducers} from 'redux';

///thêm các reducer funtion cần được combine vào đây
import JobReducer from './job.js';
import UserReducer from './user.js';
import HeaderReducer from './header.js'
import DetectClientReducer from "./detect.js";
import PlayerReducer from "./player.js";
import ConfigReducer from "./config.js"
//// khởi tạo 1 biến biểu diễn REDUCER ALL 
const Reducer = combineReducers({
    client : DetectClientReducer,
    header : HeaderReducer,
    jobs : JobReducer,
    authentication : UserReducer,
    player : PlayerReducer,
    config : ConfigReducer
});
export default Reducer;