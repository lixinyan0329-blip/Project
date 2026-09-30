import http from '../utils/http.js'

export const fetchCourses = () => {
    return http.get(`/api/courses/list`);
};

export const fetchCourseById = (id) => {
    return http.get(`/api/courses/${id}`);
};

export const fetchCoursesByCategory = (category) => {
    return http.get(`/api/courses/a/${category}`);
};
