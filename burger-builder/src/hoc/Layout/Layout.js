import React, { useState } from 'react';
import { connect } from "react-redux";

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    // state = {
    //     showSideDrawer: false
    // }
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
    
    const sideDrawerCloseHandler = () => {
        //this.setState({showSideDrawer: false})
        setSideDrawerIsVisible(false)
    };

    const sideDrawerToggleHandler = () => {
        // this.setState( ( prevState ) => {
        //     return {showSideDrawer: !prevState.showSideDrawer};
        // } );
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };
    
    return (
        <Aux>
            <Toolbar 
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible} 
                closed={sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );  
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);