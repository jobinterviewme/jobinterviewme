const initState = {
    loading: false,
    login: false,
    data: [],
    error: "",
    nombre: "",
    apellidos: "",
    email: "",
    idusuario: "",
    loginGoogle: "",
    idleTimeOut: (1000 * 20 * 60),
    cookies: false,
    usuario: null,
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'logout':
            localStorage.removeItem('booktopays');
            return { ...state, login: false, data: [], error: "" };
        case 'initGlobal':
            return { ...state, login: false, data: [], error: "" };
        case 'loading':
            return { ...state, loading: true };
        case 'cookiesOn':
            return { ...state, cookies: true };
        case 'cookiesOff':
            return { ...state, cookies: false };
        case 'setIdle':
            return { ...state, idleTimeOut: action.data };
        case 'setUsuarioValues':
            return { ...state, nombre: action.data.nombre, email: action.data.email, apellidos: action.data.apellidos, idusuario: action.data.idusuario, loginGoogle: action.data.loginGoogle };
        case 'setUsuario':
            return { ...state, usuario: action.data };
        case 'data':
            return {
                ...state,
                data: action.dataT,
                loading: false,
                error: "",
                login: true,
            };
        case 'error':
            return { ...state, error: action.dataT, loading: false };
        default:
            return state;
    }
};
export default authReducer;