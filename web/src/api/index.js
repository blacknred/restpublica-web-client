import axios from 'axios';
import asyncMddlwr from './asyncMiddleware'

axios.defaults.baseURL = 'http://localhost:3003' || process.env.API_HOST;
axios.defaults.validateStatus = status => status >= 200 && status < 429;
const GIPHY_URL = encodeURI('https://api.giphy.com/v1/gifs/random' +
    '?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13');
const FEED_RAND = window.localStorage.feedrand || 1;
const y = window.localStorage.token
const instance = axios.create({
    timeout: 5000,
    headers: { 'Authorization': `Bearer ${y}` }
});
// axios.interceptors.request.use(req => console.log(req))
// instance.interceptors.response.use(res => console.log(res))

/* LANDING */

export const getBackgroundPic = asyncMddlwr(() =>
    axios.get(GIPHY_URL, {})
)

/* PROFILES */

export const register = asyncMddlwr(data =>
    axios.post(`/users`, data)
)
export const login = asyncMddlwr(data =>
    axios.post(`/users/login`, data)
)
export const userUpdate = asyncMddlwr(data =>
    instance.put(`/users`, data)
)
export const getUserProfile = asyncMddlwr(() =>
    instance.get(`/users/profile`)
)
export const getProfile = asyncMddlwr(name =>
    instance.get(`/users/${name}`)
)
export const getTrendingProfiles = asyncMddlwr(page =>
    instance.get(`/users?offset=${page}`)
)
export const getSearchedProfiles = asyncMddlwr((query, page) => {
    instance.get(`/users?q=${query}?offset=${page}`)
})
export const createUserSubscription = asyncMddlwr((userId, data) => {
    instance.post(`/users/${userId}/follow`, { data })
})
export const removeUserSubscription = asyncMddlwr((userId, subscriptionId) => {
    instance.delete(`/users/${userId}/follow/${subscriptionId}`)
})
export const getUserSubscriptions = asyncMddlwr((userId, mode, page) => {
    instance.get(`/users/${userId}/${mode}?offset=${page}`)
})

/* COMMUNITIES */

export const createCommunity = asyncMddlwr(data =>
    instance.post(`/communities`, { data })
)
export const updateCommunity = asyncMddlwr((communityId, data) => {
    instance.put(`/communities/${communityId}`, { data })
})
export const getCommunity = asyncMddlwr(name =>
    instance.get(`/community/${name}`)
)
export const getTrendingCommunities = asyncMddlwr(page =>
    instance.get(`/communities?offset=${page}`)
)
export const getSearchedCommunities = asyncMddlwr((query, page) => {
    instance.get(`/communities?q=${query}?offset=${page}`)
})
export const getAdminCommunities = asyncMddlwr((adminId, page) => {
    instance.get(`/communities?admin=${adminId}?offset=${page}`)
})
export const getProfileCommunities = asyncMddlwr((userId, page) => {
    instance.get(`/communities?profile=${userId}?offset=${page}`)
})
export const createCommunitySubscription = asyncMddlwr((communityId, data) => {
    instance.post(`/communities/${communityId}/follow`, { data })
})
export const deleteCommunitySubscription = asyncMddlwr((communityId, subscriptionId) => {
    instance.delete(`/communities/${communityId}/follow/${subscriptionId}`)
})
export const getCommunitySubscriptions = asyncMddlwr((communityId, page) => {
    instance.get(`/communities/${communityId}/followers?offset=${page}`)
})
export const createCommunityBan = asyncMddlwr((communityId, data) => {
    instance.post(`/communities/${communityId}/ban`, { data })
})
export const getCommunityBans = asyncMddlwr((communityId, page) => {
    instance.get(`/communities/${communityId}/bans?offset=${page}`)
})

/* POSTS */

export const createPost = asyncMddlwr(data =>
    instance.post(`/posts`, { data })
)
export const updatePost = asyncMddlwr((postId, data) => {
    instance.put(`/posts/${postId}`, { data })
})
export const deletePost = asyncMddlwr(postId =>
    instance.delete(`/posts/${postId}`)
)
export const getPost = asyncMddlwr(slug =>
    instance.get(`/posts/${slug}`)
)
export const getDashboardPosts = asyncMddlwr(page =>
    instance.get(`/posts?feed=true&offset=${page}&feed_rand=${FEED_RAND}`)
)
export const getTrendingPosts = asyncMddlwr(page =>
    instance.get(`/posts?offset=${page}`)
)
export const getSearchedPosts = asyncMddlwr((query, page) => {
    instance.get(`/posts?q=${query}?offset=${page}`)
})
export const getTagPosts = asyncMddlwr((tag, page) => {
    instance.get(`/posts?tag=${tag}?offset=${page}`)
})
export const getProfilePosts = asyncMddlwr((userId, page) => {
    instance.get(`/posts?profile=${userId}?offset=${page}`)
})
export const getCommunityPosts = asyncMddlwr((communityId, page) => {
    instance.get(`/posts?community=${communityId}?offset=${page}`)
})
export const createPostComment = asyncMddlwr((postId, data) => {
    instance.post(`/posts/${postId}/comments`, { data })
})
export const updatePostComment = asyncMddlwr((postId, commentId, data) => {
    instance.put(`/posts/${postId}/comments/${commentId}`, { data })
})
export const deletePostComment = asyncMddlwr((postId, commentId) => {
    instance.delete(`/posts/${postId}/comments/${commentId}`)
})
export const getPostComments = asyncMddlwr((postId, page) => {
    instance.get(`/posts/${postId}/comments?offset=${page}`)
})
export const createPostLike = asyncMddlwr((postId, data) => {
    instance.post(`/posts/${postId}/likes`, { data })
})
export const deletePostLike = asyncMddlwr((postId) => {
    instance.delete(`/posts/${postId}/likes`)
})
export const getPostLikes = asyncMddlwr((postId, page) => {
    instance.get(`/posts/${postId}/likes?offset=${page}`)
})
export const getTrendingTags = asyncMddlwr(page =>
    instance.get(`/tags?offset=${page}`)
)
export const getSearchedTags = asyncMddlwr((query, page) => {
    instance.get(`/tags?offset=${page}`)
})

/* PARTNERS API */

export const getApiPlans = asyncMddlwr(() =>
    instance.get(`/plans`)
)
export const getApiPlan = asyncMddlwr(planId =>
    instance.get(`/plans/${planId}`)
)
export const createPartnerApp = asyncMddlwr(data =>
    instance.post(`/apps`, { data })
)
export const updatePartnerApp = asyncMddlwr((appId, data) => {
    instance.put(`/apps/${appId}`, { data })
})
export const deletePartnerApp = asyncMddlwr(postId =>
    instance.delete(`/apps/${postId}`)
)
export const getPartnerApp = asyncMddlwr(appId =>
    instance.get(`/apps/${appId}`)
)