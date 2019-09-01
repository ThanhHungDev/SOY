import {combineReducers} from 'redux';

///thêm các reducer funtion cần được combine vào đây
import JobReducer from './job.js';
import UserReducer from './user.js';
import HeaderReducer from './header.js'
//// khởi tạo 1 biến biểu diễn REDUCER ALL 
const Reducer = combineReducers({
  header : HeaderReducer,
  jobs : JobReducer,
  users : UserReducer 
});
export default Reducer;