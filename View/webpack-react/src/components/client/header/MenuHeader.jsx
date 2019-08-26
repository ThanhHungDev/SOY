import React, { Component } from 'react'
import {Link } from 'react-router-dom';
import CONFIG from './../../../config';

export default class MenuHeader extends Component {
    render() {
        const LOGO = {
            URL : CONFIG.ASSET + "img/logo.png", 
            ALT : CONFIG.SITE.title
        }
        const MENU = [
            { url : '/about' , title  : 'about' },
            { url : '/contact' , title  : 'contact',
                submenu : [
                    { url : '/contact/group' , title : 'group'},
                    { url : '/contact/sinh-vien' , title : 'sinh viên'}
                ]
            },
            { title  : 'tin tức',
                submenu : [
                    { url : '/news/child' , title : 'child'},
                    { url : '/news/familly' , title : 'familly'}
                ]
            },
            { url : '/admin' , title  : 'admin' }
        ];
        const MENU_MAPING = MENU.map(
            ( item , key ) => {
                var SUBMENU = item.url ? <Link to={item.url}>{item.title}</Link> : <a onClick={ e => e.preventDefault()}>{item.title}</a>;

                var UL_SUB_MENU = item.submenu && item.submenu.length && <ul className="submenu">{
                    item.submenu.map(
                        (e, i) => <li key={i+ e.url}><Link to={e.url}>{e.title}</Link></li>
                    )
                }</ul>;
                return <li key={"link"+key+"menu"} >{SUBMENU} {UL_SUB_MENU}</li>;
            }
        );
        
        return (
            <div className="MenuHeaderComponent clear">
                <div className="float-left">
                    <Link to="/" >
                        <img src={LOGO.URL} alt={LOGO.ALT}/>
                    </Link>
                </div>
                <div className="float-right">
                    <ul className="menu">
                        {MENU_MAPING}
                    </ul>
                </div>
            </div>
        )
    }
}
