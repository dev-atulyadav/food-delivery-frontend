// NOTE: API client disabled for mock/demo mode.
// Previous axios-based client retained below for reference.
// import axios from "axios";
// const api = axios.create({ baseURL: 'http://localhost:8080/api/v1' });
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('jwtToken');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });
// export default api;

// Placeholder mock API to signal disabled network layer
const api = {
    get: async () => { throw new Error('Network disabled: using mock data'); },
    post: async () => { throw new Error('Network disabled: using mock data'); },
    put: async () => { throw new Error('Network disabled: using mock data'); },
    delete: async () => { throw new Error('Network disabled: using mock data'); }
}

export default api;
