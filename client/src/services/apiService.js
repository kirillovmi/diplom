import store from '../store';
import setAuthToken from './setAuthToken';
import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

//--------------------------------------USER------------------------------------------
//User registration
const registerUser = (name, email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, email, password});

    try {
        return axios.post('/api/users', body, config);
    } catch(error) {
        return error.response.data.errors;
    }
};

//Login user
const loginUser = (email, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        return axios.post('api/auth', body, config);
    } catch (error) {
        return error.response.data.errors;
    }
};

//Get auth user
const  getAuthUser = () => {
    if (store.getters.getToken) {
        setAuthToken(store.getters.getToken)
    }

    try{
        return axios.get('api/auth');
    } catch(error) {
        return error.response.data.errors;
    }
};

//--------------------------------------LESSON-------------------------------------------
//Get all profiles
const getProfiles = () => {
    return axios.get('/api/profile');
};

//Get all lessons
const getLessons = () => {
    return axios.get('/api/lesson');
}

//Get one lesson
const getOneLesson = () => {
    return axios.get('/api/lesson/' + store.getters.getCurrentPost);
}

//Add new lesson
const addNewLesson = (title, video, theory, question) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, video, theory, question});

    try {
        return axios.post('api/lesson', body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

//Add information about user's testing
const answerTest = (isFinished) => {
    if (store.getters.getToken) {
        setAuthToken(store.getters.getToken);
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({isFinished});

    try {
        return axios.put('api/lesson/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const updateLesson = (title, video, theory, question) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, video, theory, question});

    try {
        return axios.post('api/lesson/update/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const deleteLesson = () => {
    return axios.delete('api/lesson/' + store.getters.getCurrentPost);
}

const getUserAnswers = () => {
    return axios.get('api/lesson/user_answers');
}
//--------------------------------PRACTIC---------------------------------------
//Add new practic
const addNewPractic = (title, question, file) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, question, file});

    try {
        return axios.post('api/practic', body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

//Get all practics
const getAllPractics = () => {
    return axios.get('/api/practic');
}

//Get one practic
const getOnePractic = () => {
    return axios.get('/api/practic/' + store.getters.getCurrentPost);
}

//Upload document
const uploadDocument = () => {
    return axios.post('/api/practic/' + store.getters.getCurrentPost);
}

//Download document
const downloadDocument = (file) => {
    return axios.get('api/practic/download/' + file,)
}

//Upload user's file upload information
const uploadDocumentInformation = (file) => {
    if (store.getters.getToken) {
        setAuthToken(store.getters.getToken)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({file});

    try {
        return axios.put('api/practic/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const updatePractic = (title, question, file) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, question, file});

    try {
        return axios.post('api/practic/update/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const deletePractic = () => {
    return axios.delete('api/practic/' + store.getters.getCurrentPost);
}

//---------------------------------DEMO------------------------------------------
const addNewDemo = (title, question, file) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, question, file});

    try {
        return axios.post('api/demo', body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

//Get all demo
const getAllDemo = () => {
    return axios.get('/api/demo');
}

//Get one demo
const getOneDemo = () => {
    return axios.get('/api/demo/' + store.getters.getCurrentPost);
}

//Upload document
const uploadDemoDocument = () => {
    return axios.post('/api/demo/' + store.getters.getCurrentPost);
}

//Download document
const downloadDemoDocument = (file) => {
    return axios.get('api/demo/download/' + file)
}

//Upload user's file upload information
const uploadDemoDocumentInformation = (file) => {
    if (store.getters.getToken) {
        setAuthToken(store.getters.getToken)
    }
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({file});

    try {
        return axios.put('api/demo/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const updateDemo = (title, question, file) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, question, file});

    try {
        return axios.post('api/demo/update/' + store.getters.getCurrentPost, body, config);
    } catch (error) {
        return error.response.data.errors;
    }
}

const deleteDemo = () => {
    return axios.delete('api/demo/' + store.getters.getCurrentPost);
}

export {
    registerUser,
    loginUser,
    getAuthUser,
    
    getProfiles,

    getLessons,
    getOneLesson,
    addNewLesson,
    answerTest,
    updateLesson,
    deleteLesson,
    getUserAnswers,

    addNewPractic,
    getAllPractics,
    getOnePractic,
    uploadDocument,
    downloadDocument,
    uploadDocumentInformation,
    updatePractic,
    deletePractic,

    addNewDemo,
    getAllDemo,
    getOneDemo,
    uploadDemoDocument,
    downloadDemoDocument,
    uploadDemoDocumentInformation,
    updateDemo,
    deleteDemo
};