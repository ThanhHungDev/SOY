import TYPE from '../actions/action_type.js';
const initialStateHeader = [
    { url: '/play-now', title: 'chơi ngay'},
    {
        title: 'bạn bè',
        submenu: [
            { url: '/friend/find', title: 'tìm bạn' },
            { url: '/friend/play-level', title: 'đấu hạng' }
        ]
    },
    {
        title: 'hẹn hò', 
        submenu: [
            { url: '/find-love/boy', title: 'tìm bạn trai' },
            { url: '/find-love/girl', title: 'tìm bạn gái' }
        ]
    },
    { url: '/login', title: 'login'  }
];
export default function HeaderReducer(state = initialStateHeader , action) {
    switch (action.type) {
        case TYPE.CHANGE_ACTIVE_MENU:
            return state.map(
                ( item, index ) => {
                    if(index == action.payload){
                        return {...item , active : true}
                    }else {
                        return {...item , active : false}
                    }
                }
            );
        case TYPE.IS_LOGGED:
            return state.map(
                item => {
                    if(item.url == '/login'){
                        return { url: '/profile', title: 'profile' }
                    }
                    return {...item }
                }
            );
        default:
            return state;
    }
}