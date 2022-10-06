export type LoginState = {
    email: string,
    password: string,
    isLoading: boolean,
    error: string,
    isLoggedIn: boolean

}

type LoginAction =
    { type: 'login' | 'success' | 'error' | 'logout' }
    | { type: 'field', fieldName: string, payload: string }

export const initialState = {
    email: '',
    password: "",
    isLoading: false,
    error: "",
    isLoggedIn: false

}

export const loginReducer = (state: LoginState, action: LoginAction) => {

    switch (action.type) {
        case "field": {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }

        case "login":
            return {
                ...state,
                error: '',
                isLoading: true
            }

        case "success":
            return {
                ...state,
                isLoggedIn: true,
                isLoading: true
            }
        case "error":
            return {
                ...state,
                error: 'Wrong Email or Password',
                isLoggedIn: false,
                isLoading: false
            }
        case "logout":
            return {
                ...state,
                isLoggedIn: false,
            }
        default:
            return state

    }

}