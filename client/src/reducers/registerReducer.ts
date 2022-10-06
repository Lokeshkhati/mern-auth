export type RegisterState = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    error: string,
    isLoading: boolean,
}

type RegisterAction =
    { type: 'register' | 'success' | 'error' }
    | { type: 'field', fieldName: string, payload: string }

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: "",
    error: "",
    isLoading: false,

}

export const registerReducer = (state: RegisterState, action: RegisterAction) => {
    switch (action.type) {
        case "field": {
            return {
                ...state,
                [action.fieldName]: action.payload
            }
        }
        case "register":
            return {
                ...state,
                error: '',
                isLoading: true
            }

        case "success":
            return {
                ...state,
                isLoading: true
            }
        case "error":
            return {
                ...state,
                error: 'There is some error in registering the user',
                isLoading: false
            }
        default:
            return state

    }

}