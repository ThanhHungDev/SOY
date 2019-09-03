import TYPE from '../actions/action_type.js';
const initialStateHeader = [
    { url: '/about', title: 'chơi ngay' , active : true },
    {
        title: 'contact',
        submenu: [
            { url: '/contact/group', title: 'group' },
            { url: '/contact/sinh-vien', title: 'sinh viên' }
        ]
    },
    {
        title: 'tin tức', 
        submenu: [
            { url: '/news/child', title: 'child' },
            { url: '/news/familly', title: 'familly' }
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