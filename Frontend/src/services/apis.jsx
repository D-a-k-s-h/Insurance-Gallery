const BASE_URL = 'http://localhost:4000/api/v1';

export const auth = {
    LOGIN_API: BASE_URL + '/auth/login',
    SIGNUP_API: BASE_URL + '/auth/signup'
}

export const search = {
    SEARCH_MOTOR_API: BASE_URL + '/search/search-policy',
    GET_AGENTS_API: BASE_URL + '/search/get-agents',
    GET_COMPANIES_API: BASE_URL + '/search/get-companies',
    GET_CASE_TYPES_API: BASE_URL + '/search/get-case-types',
    GET_MAKES_API: BASE_URL + '/search/get-makes',
    GET_RM_NAMES: BASE_URL + '/search/get-rmnames',
    GET_USER_INFO_API: BASE_URL + '/search/get-user-info',
    GET_MODAL_INFO_API: BASE_URL + '/search/get-modals',
    GET_POLICY_INFO_API: BASE_URL + '/search/get-policy-info'
}

export const creation = {
    CREATE_POLICY: BASE_URL + '/create/create-policy',
    UPDATE_POLICY: BASE_URL + '/create/update-policy',
    CREATE_USER: BASE_URL + '/create/create-agent',
    CREATE_UPDATE_COMPANY_API: BASE_URL + '/create/create-update-company',
    CREATE_UPDATE_MAKE_API: BASE_URL + '/create/create-update-make',
    CREATE_UPDATE_MODAL_API: BASE_URL + '/create/create-update-modal'
}

export const deletion = {
    DELETE_USER: BASE_URL + '/create/delete-user',
    DELETE_COMPANY: BASE_URL + '/create/delete-company',
    DELETE_MAKE: BASE_URL + '/create/delete-make',
    DELETE_MODAL: BASE_URL + '/create/delete-modal'
}