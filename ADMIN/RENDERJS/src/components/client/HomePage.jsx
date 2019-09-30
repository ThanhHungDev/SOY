import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from './Header.jsx';
import Footer from "./Footer.jsx";
import { NavLink } from "react-router-dom"

class HomePage extends Component {
    render() {
        return (
            <div className="HomePageComponent">
                <Header />
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                <NavLink to="admin/login"> 
                    hùng login 
                </NavLink>
                    Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!</div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return (
        { client : state.client , authentication : state.authentication }
    );
}
export default connect (mapStateToProps)(HomePage);