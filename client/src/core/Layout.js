import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'

const Layout = ({children, history, match}) => {
    const isActive = path => {
        if (match.path === path) {
            return {color: '#000'}
        } else {
            return {color: '#fff'}
        }
    }


    const nav = () => (
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link to={'/'} style={isActive('/')} className="nav-link">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/signin'} style={isActive('/signin')} className="nav-link">
                    Sign In
                </Link>
            </li>
            <li className="nav-item">
                <Link to={'/signup'} style={isActive('/signup')} className="nav-link">
                    Signup
                </Link>
            </li>
        </ul>
    )

    return (
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    )
}

export default withRouter(Layout)
