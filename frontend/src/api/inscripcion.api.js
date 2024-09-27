import axios from './axios.js'

export const inscripcionRequest = (id, data) => {
    return axios.post(`/inscripcion/${id}`, data)
}
export const getInspcricionesRequest = () => {
    return axios.get(`/inscripcion/`)
}

export const rechazarPreInscripcionRequest = (id) => {
    return axios.delete(`/inscripcion/${id}`)
}
export const aceptarPreInscripcionRequest = (id) => {
    return axios.put(`/inscripcion/${id}`)
}

export const getInscritosRequest = () => {
    return axios.get(`/inscritos/`)
}

export const  getPreInscripcionById = (id) => {

    return axios.get(`pre/inscripcion/${id}`)
}


export const  getInscripcionById = (id) => {

    return axios.get(`/inscripcion/${id}`)
}

