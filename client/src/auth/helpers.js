import cookie from 'js-cookie'

export const setCookie = (key, value) => {
    if (!!window) {
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = key => {
    if (!!window) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = key => {
    if (!!window) {
        return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (!!window) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = key => {
    if (!!window) {
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE')
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next()
}

export const isAuth = () => {
    if (!!window) {

        const cookieChecked = getCookie('token')

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }

    }
}

export const signOut = next => {
    removeCookie('token')
    removeLocalStorage('user')
    next()
}

