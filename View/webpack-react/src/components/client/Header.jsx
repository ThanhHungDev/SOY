import React, { Component } from "react";
import {Link} from "react-router-dom"

/**
 * import define
 */
import CONFIG from "../../config";
import IconAlignJustify from "../../icon/svg/align-justify.jsx" ;
import IconAngleDown from "../../icon/svg/angle-down.jsx"
class Header extends Component {
    activeSidebar = ()=> {
        alert(112131);
    }
    render() {
        const LOGO = {
            URL : CONFIG.SERVER.domain + "/logo/logo.png", 
            ALT : CONFIG.SERVER.title
        }
        const data_menu =  [
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

        return (
          <div className="HeaderComponent">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="MenuHeaderComponent clear wrapper-menu">
                    <div className="float-left">
                      <Link to="/" className="d-inline-block">
                        <img src={LOGO.URL} alt={LOGO.ALT} />
                      </Link>
                    </div>
                    <div className="float-right mobile-fixed-sidebar">
                      {/* <div className="mobile">
                        <Link to="/" className="d-inline-block">
                          <img src={LOGO.URL} alt={LOGO.ALT} />
                        </Link>
                      </div> */}
                      <ul className="wrapper-menu-left clear">
                        {data_menu.map((item, index) => {
                          return (
                            <li key={index}>
                              <Link
                                to={item.url ? item.url : ""}
                                onClick={
                                  !item.url ? e => e.preventDefault() : e => {}
                                }
                              >
                                {item.title}
                                {item.submenu && <span><IconAngleDown /></span>}
                              </Link>
                              {item.submenu && (
                                <ul className="submenu">
                                  {item.submenu.map((sub_item, sub_index) => {
                                    return (
                                      <li key={sub_index}>
                                        <Link to={sub_item.url}>
                                          {sub_item.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <button
                        className="btn-toggle-menu mobile"
                        onClick={this.activeSidebar}>
                        <IconAlignJustify />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Header;