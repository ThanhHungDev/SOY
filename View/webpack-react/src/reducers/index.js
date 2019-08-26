import {combineReducers} from 'redux';

///thêm các reducer funtion cần được combine vào đây
import JobReducer from './job.js';
import UserReducer from './user.js';
//// khởi tạo 1 biến biểu diễn REDUCER ALL 
const Reducer = combineReducers({
  jobs : JobReducer,
  users : UserReducer 
});
export default Reducer;
