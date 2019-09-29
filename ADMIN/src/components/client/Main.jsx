import React, { Component } from "react";
import {Link} from 'react-router-dom';
// import { connect  } from 'react-redux';

////define
// import {actionJobClickDemo} from '../../actions';

class Main extends Component {
    render() {
        // var DF_LIST_JOB = this.props.ListJob.map(
        //     (item) => {
        //         return (
        //             <li id={item.id}
        //                 onClick={this.props.click_demo}
        //                 key={item.id}> job id: {item.id} and job title: {item.title} </li>
        //         );
        //     }
        // );
        return (
            <div className="MainComponent">
                {/* <div>contain : <br/> {DF_LIST_JOB}</div> */}
                <ul className="animated zoomInUp">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/admin">admin </Link></li>
                </ul>
                <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid quidem quos nemo rem officiis praesentium illo placeat. Perferendis cumque numquam quibusdam explicabo aliquam magni atque laborum voluptate, tempore hic alias!</div>
            </div>
        );
    }
}
export default Main;

// const mapStateToProps = state => {
//     return (
//         { ListJob : state.jobs }
//     );
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         click_demo: item => dispatch(actionJobClickDemo(item))
//     }
// }
// export default connect(mapStateToProps , mapDispatchToProps)(Main);