import TYPE from '../actions/action_type.js';
const initialStateHeader = [
    { url: '/about', title: 'about' , active : true },
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
    { url: '/login', title: 'login'  },
    { url: '/forgot-password' , title : 'forgot password' }
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
        default:
            return state;
    }
}