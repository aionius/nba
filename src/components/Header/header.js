import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import style from './header.css';
import SideNavigation from '../Header/SideNav/sidenav';

const Header = (props) => {

    const navBars = () => (
        <div className={style.bars}>
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
                style={{
                    color: '#dfdfdf',
                    padding: '10px',
                    cursor: 'pointer',
                    verticalAlign: 'middle'
                }}/>
        </div>
    )

    const logo = () => {
        return (
            <Link to="/" className={style.logo}>
                <img alt="nba logo" src="/images/nba_logo.png" />
            </Link>
        );
    }

    return (
        <header className={style.header}>
            <SideNavigation {...props}/>
            <div className={style.headeropt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    );
} 

export default Header;