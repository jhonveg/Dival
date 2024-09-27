import axios from './axios'

export const getCoursesRequest = () => axios.get('/courses')
export const getCourseRequest = (id) => axios.get(`/courses/${id}`)
export const createCoursesRequest = (course) => axios.post('/courses', course, {

})
export const updateCourseRequest = (id, data) => axios.put(`courses/${id}`, data)
export const deleteCourseRequest = (id) => axios.delete(`courses/${id}`)