import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {isAuth, signOut} from '../auth/helpers'

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

            {!isAuth() && (
                <Fragment>
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
                </Fragment>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span className="nav-link">{isAuth().name}</span>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <span style={{cursor: 'pointer', color: '#fff'}} onClick={() => {
                        signOut(() => {
                            history.push('/')
                        })
                    }} className="nav-link">Sign Out</span>
                </li>
            )}
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
