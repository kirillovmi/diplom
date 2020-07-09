import {registerUser, loginUser} from '../../services/apiService'
//import router from '../../router'

export default {
    actions: {
        userRegistration(ctx, {name, email, password}) {
            registerUser(name, email, password).then((token) => {
                ctx.commit('updateToken', token.data.token);
                //router.push('profile');
            }).catch((error) => {
                ctx.commit('getErrors', error);
            });
        },
        loginUser(ctx, {email, password}) {
            loginUser(email, password).then((token) => {
                ctx.commit('updateToken', token.data.token);
                //router.push('profile');
            }).catch((error) => {
                ctx.commit('getErrors', error);
            });
        },
        getCurrentPost(ctx, {slug}) {
            ctx.commit('getCurrentPost', slug);
        }
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
        },
        getErrors(state, error)
        {
            state.error = error.response.data.errors;
        },
        getCurrentPost(state, slug) {
            state.currentPost = slug;
        },
        logOut(state) {
            state.token = ''
        },
        updateError(state) {
            state.error = ''
        }
    },
    state: {
        token: '',
        error: '',
        user: {},
        currentPost: ''
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getErrors(state) {
            return state.error;
        },
        getCurrentPost(state) {
            return state.currentPost;
        }
    }
}