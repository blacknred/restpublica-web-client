import axios from 'axios';
import asyncMiddleware from './asyncMiddleware'

const GIPHY_URL =
    encodeURI(`https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13`);
const API_HOST = 'http://localhost:3003' || process.env.API_HOST;
const authToken = window.localStorage.authToken
const HEADERS = { headers: { Authorization: `Bearer ${authToken}` } }


/* LANDING */

export const getBackgroundPic = asyncMiddleware(() =>
    axios.get(GIPHY_URL, {})
)

/* PROFILES */

export const register = asyncMiddleware(data =>
    axios.post(`${API_HOST}/users`, data)
)
export const login = asyncMiddleware(data =>
    axios.post(`${API_HOST}/users/login`, data)
)
export const userUpdate = asyncMiddleware(data =>
    axios.put(`${API_HOST}/users`, data, HEADERS)
)
export const getUserProfile = asyncMiddleware(() =>
    axios.get(`${API_HOST}/users/profile`, HEADERS)
)
export const getProfile = asyncMiddleware(name =>
    axios.get(`${API_HOST}users/${name}`, HEADERS)
)
export const getTrendingProfiles = asyncMiddleware(page =>
    axios.get(`${API_HOST}/users?offset=${page}`, HEADERS)
)
export const getSearchedProfiles = asyncMiddleware((query, page) => {
    axios.get(`${API_HOST}/users?q=${query}?offset=${page}`, HEADERS)
})
export const createUserSubscription = asyncMiddleware((userId, data) => {
    axios.post(`${API_HOST}/users/${userId}/follow`, { data }, HEADERS)
})
export const removeUserSubscription = asyncMiddleware((userId, subscriptionId) => {
    axios.delete(`${API_HOST}/users/${userId}/follow/${subscriptionId}`, HEADERS)
})
export const getUserSubscriptions = asyncMiddleware((userId, mode, page) => {
    axios.get(`${API_HOST}/users/${userId}/${mode}?offset=${page}`, HEADERS)
})

/* COMMUNITIES */

export const createCommunity = asyncMiddleware(data =>
    axios.post(`${API_HOST}/communities`, { data }, HEADERS)
)
export const updateCommunity = asyncMiddleware((communityId, data) => {
    axios.put(`${API_HOST}/communities/${communityId}`, { data }, HEADERS)
})
export const getCommunity = asyncMiddleware(name =>
    axios.get(`${API_HOST}/community/${name}`, HEADERS)
)
export const getTrendingCommunities = asyncMiddleware(page =>
    axios.get(`${API_HOST}/communities?offset=${page}`, HEADERS)
)
export const getSearchedCommunities = asyncMiddleware((query, page) => {
    axios.get(`${API_HOST}/communities?q=${query}?offset=${page}`, HEADERS)
})
export const getAdminCommunities = asyncMiddleware((adminId, page) => {
    axios.get(`${API_HOST}/communities?admin=${adminId}?offset=${page}`, HEADERS)
})
export const getProfileCommunities = asyncMiddleware((userId, page) => {
    axios.get(`${API_HOST}/communities?profile=${userId}?offset=${page}`, HEADERS)
})
export const createCommunitySubscription = asyncMiddleware((communityId, data) => {
    axios.post(`${API_HOST}/communities/${communityId}/follow`, { data }, HEADERS)
})
export const deleteCommunitySubscription = asyncMiddleware((communityId, subscriptionId) => {
    axios.delete(`${API_HOST}/communities/${communityId}/follow/${subscriptionId}`, HEADERS)
})
export const getCommunitySubscriptions = asyncMiddleware((communityId, page) => {
    axios.get(`${API_HOST}/communities/${communityId}/followers?offset=${page}`, HEADERS)
})
export const createCommunityBan = asyncMiddleware((communityId, data) => {
    axios.post(`${API_HOST}/communities/${communityId}/ban`, { data }, HEADERS)
})
export const getCommunityBans = asyncMiddleware((communityId, page) => {
    axios.get(`${API_HOST}/communities/${communityId}/bans?offset=${page}`, HEADERS)
})

/* POSTS */

export const createPost = asyncMiddleware(data =>
    axios.post(`${API_HOST}/posts`, { data }, HEADERS)
)
export const updatePost = asyncMiddleware((postId, data) => {
    axios.put(`${API_HOST}/posts/${postId}`, { data }, HEADERS)
})
export const deletePost = asyncMiddleware(postId =>
    axios.delete(`${API_HOST}/posts/${postId}`, HEADERS)
)
export const getPost = asyncMiddleware(slug =>
    axios.get(`${API_HOST}/posts/${slug}`, HEADERS)
)
export const getDashboardPosts = asyncMiddleware(page =>
    axios.get(`${API_HOST}/posts?dashboard=true&offset=${page}`, HEADERS)
)
export const getTrendingPosts = asyncMiddleware(page =>
    axios.get(`${API_HOST}/posts?offset=${page}`, HEADERS)
)
export const getSearchedPosts = asyncMiddleware((query, page) => {
    axios.get(`${API_HOST}/posts?q=${query}?offset=${page}`, HEADERS)
})
export const getTagPosts = asyncMiddleware((tag, page) => {
    axios.get(`${API_HOST}/posts?tag=${tag}?offset=${page}`, HEADERS)
})
export const getProfilePosts = asyncMiddleware((userId, page) => {
    axios.get(`${API_HOST}/posts?profile=${userId}?offset=${page}`, HEADERS)
})
export const getCommunityPosts = asyncMiddleware((communityId, page) => {
    axios.get(`${API_HOST}/posts?community=${communityId}?offset=${page}`, HEADERS)
})
export const createPostComment = asyncMiddleware((postId, data) => {
    axios.post(`${API_HOST}/posts/${postId}/comments`, { data }, HEADERS)
})
export const updatePostComment = asyncMiddleware((postId, commentId, data) => {
    axios.put(`${API_HOST}/posts/${postId}/comments/${commentId}`, { data }, HEADERS)
})
export const deletePostComment = asyncMiddleware((postId, commentId) => {
    axios.delete(`${API_HOST}/posts/${postId}/comments/${commentId}`, HEADERS)
})
export const getPostComments = asyncMiddleware((postId, page) => {
    axios.get(`${API_HOST}/posts/${postId}/comments?offset=${page}`, HEADERS)
})
export const createPostLike = asyncMiddleware((postId, data) => {
    axios.post(`${API_HOST}/posts/${postId}/likes`, { data }, HEADERS)
})
export const deletePostLike = asyncMiddleware((postId) => {
    axios.delete(`${API_HOST}/posts/${postId}/likes`, HEADERS)
})
export const getPostLikes = asyncMiddleware((postId, page) => {
    axios.get(`${API_HOST}/posts/${postId}/likes?offset=${page}`, HEADERS)
})
export const getTrendingTags = asyncMiddleware(page =>
    axios.get(`${API_HOST}/tags?offset=${page}`, HEADERS)
)
export const getSearchedTags = asyncMiddleware((query, page) => {
    axios.get(`${API_HOST}/tags?offset=${page}`, HEADERS)
})

/* PARTNERS API */

export const getApiPlans = asyncMiddleware(() =>
    axios.get(`${API_HOST}/plans`)
)
export const getApiPlan = asyncMiddleware(planId =>
    axios.get(`${API_HOST}/plans/${planId}`)
)
export const createPartnerApp = asyncMiddleware(data =>
    axios.post(`${API_HOST}/apps`, { data })
)
export const updatePartnerApp = asyncMiddleware((appId, data) => {
    axios.put(`${API_HOST}/apps/${appId}`, { data })
})
export const deletePartnerApp = asyncMiddleware(postId =>
    axios.delete(`${API_HOST}/apps/${postId}`)
)
export const getPartnerApp = asyncMiddleware(appId =>
    axios.get(`${API_HOST}/apps/${appId}`)
)