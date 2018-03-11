import axios from 'axios';
import asyncMiddleware from './asyncMiddleware'

const giphyURL = encodeURI('https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13')
const USERS_API_ROOT = 'http://localhost:3001/api/v1/users/'
const POSTS_API_ROOT = 'http://localhost:3002/api/v1/posts/'
const authToken = window.localStorage.authToken
const authHeaders = authToken ? { headers: { Authorization: `Bearer ${authToken}` } } : {}


// LANDING
export const getGiphyPic = asyncMiddleware(() =>
    axios.get(giphyURL, {})
)

// AUTH
export const login = asyncMiddleware(userData =>
    axios.post(`${USERS_API_ROOT}login`, userData)
)
export const register = asyncMiddleware(userData =>
    axios.post(`${USERS_API_ROOT}register`, userData)
)

// SETTINGS
export const getProfileData = asyncMiddleware(() =>
    axios.get(`${USERS_API_ROOT}profile`, authHeaders)
)
export const userUpdate = asyncMiddleware(userData =>
    axios.put(`${USERS_API_ROOT}update`, userData, authHeaders)
)
export const avatarUpdate = asyncMiddleware(avatar =>
    axios.put(`${USERS_API_ROOT}update/avatar`, avatar, authHeaders)
)

// USER PAGE
export const getUserData = asyncMiddleware(name =>
    axios.get(`${USERS_API_ROOT}user/${name}`, authHeaders)
)
export const getUserId = asyncMiddleware(name =>
    axios.get(`${USERS_API_ROOT}getid/${name}`, authHeaders)
)
export const getSubscriptions = asyncMiddleware(data =>
    axios.get(`${USERS_API_ROOT}${data.mode}/${data.id}?offset=${data.page}`, authHeaders)
)
export const createSubscription = asyncMiddleware(userId =>
    axios.post(`${USERS_API_ROOT}subscription`, { userId }, authHeaders)
)
export const removeSubscription = asyncMiddleware(id =>
    axios.delete(`${USERS_API_ROOT}subscription/${id}`, authHeaders)
)

// POSTS
export const getDashboardPosts = asyncMiddleware(data =>
    axios.get(`${POSTS_API_ROOT}dashboard?offset=${data.page}&filter=${data.filter}`, authHeaders)
)
export const getTrendingPosts = asyncMiddleware(data =>
    axios.get(`${POSTS_API_ROOT}trending?offset=${data.page}&filter=${data.filter}`, authHeaders)
)
export const getSearchPosts = asyncMiddleware(data =>
    axios.get(`${POSTS_API_ROOT}search/${data.query}?offset=${data.page}&filter=${data.filter}`, authHeaders)
)
export const getUserPosts = asyncMiddleware(data =>
    axios.get(`${POSTS_API_ROOT}u/${data.username}?offset=${data.page}&filter=${data.filter}`, authHeaders)
)

//USERS
export const getTrendingUsersNoPosts = asyncMiddleware(() =>
    axios.get(`${USERS_API_ROOT}trending/noposts`, authHeaders)
)
export const getTrendingUsers = asyncMiddleware((data) =>
    axios.get(`${USERS_API_ROOT}trending?offset=${data.page}&filter=${data.filter}`, authHeaders)
)
export const getSearchedUsers = asyncMiddleware((data) =>
    axios.get(`${USERS_API_ROOT}search/${data.query}?offset=${data.page}&filter=${data.filter}`, authHeaders)
)