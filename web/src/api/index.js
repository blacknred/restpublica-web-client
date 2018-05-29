import axios from 'axios';
// import { asyncMddlwr } from './_helpers'

const GIPHY_URL = encodeURI('https://api.giphy.com/v1/gifs/random' +
    '?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13');
const STORAGE_HOST = process.env.STORAGE_HOST || 'http://127.0.0.1:3007'
const FEED_RAND = window.localStorage.feedrand || 1;

axios.defaults.baseURL = process.env.API_HOST || 'http://127.0.0.1:3003'
axios.interceptors.response.use(res => res.data, err => null)

const instance = axios.create();
instance.defaults.timeout = 15000
instance.defaults.validateStatus = status => status >= 200 && status < 429
instance.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.token
instance.interceptors.response.use(
    (res) => {
        const { data, status } = res;
        if (process.env.NODE_ENV !== 'production') console.log(data)
        return { ...data, status }
    },
    (err) => process.env.NODE_ENV !== 'production' &&
        console.log((err.response && err.response.data) || err.message)
)

/* LANDING */

export const getBackgroundPic = () => axios.get(GIPHY_URL)

/* FETCH URL */

export const getFetchedData = url => axios.get('/proxy?url=' + url)

/* STORAGE */

export const saveFileInStorage = data => axios.post(STORAGE_HOST, data)

/* PROFILES */

export const register = data =>
    instance.post(`/users`, data, { headers: { 'Authorization': '' } })

export const login = data =>
    instance.post(`/users/login`, data, { headers: { 'Authorization': '' } })

export const userUpdate = data => instance.put(`/users`, data)

export const getUserProfile = () => instance.get(`/users/profile`)

export const getProfile = name => instance.get(`/users/${name}`)

export const getTrendingProfiles = page => instance.get(`/users?offset=${page}`)

export const getSearchedProfiles = ({ query, page }) =>
    instance.get(`/users?q=${query}?offset=${page}`)

export const createUserSubscription = ({ userId, data }) =>
    instance.post(`/users/${userId}/follow`, data)

export const removeUserSubscription = ({ userId, subscriptionId }) =>
    instance.delete(`/users/${userId}/follow/${subscriptionId}`)

export const getUserSubscriptions = ({ userId, mode, page }) =>
    instance.get(`/users/${userId}/${mode}?offset=${page}`)

/* COMMUNITIES */

export const createCommunity = data => instance.post(`/communities`, data)

export const updateCommunity = ({ communityId, data }) =>
    instance.put(`/communities/${communityId}`, data)

export const getCommunity = name => instance.get(`/community/${name}`)

export const getTrendingCommunities = page =>
    instance.get(`/communities?offset=${page}`)

export const getSearchedCommunities = ({ query, page }) =>
    instance.get(`/communities?q=${query}?offset=${page}`)

export const getAdminCommunities = ({ adminId, page }) =>
    instance.get(`/communities?admin=${adminId}?offset=${page}`)

export const getProfileCommunities = ({ userId, page }) =>
    instance.get(`/communities?profile=${userId}&offset=${page}`)

export const createCommunitySubscription = ({ communityId, data }) =>
    instance.post(`/communities/${communityId}/follow`, data)

export const deleteCommunitySubscription = ({ communityId, subscriptionId }) =>
    instance.delete(`/communities/${communityId}/follow/${subscriptionId}`)

export const getCommunitySubscriptions = ({ communityId, page }) =>
    instance.get(`/communities/${communityId}/followers?offset=${page}`)

export const createCommunityBan = ({ communityId, data }) =>
    instance.post(`/communities/${communityId}/ban`, data)

export const getCommunityBans = ({ communityId, page }) =>
    instance.get(`/communities/${communityId}/bans?offset=${page}`)

/* POSTS */

export const createPost = data => instance.post(`/posts`, data)

export const updatePost = ({ postId, data }) =>
    instance.put(`/posts/${postId}`, data)

export const deletePost = postId => instance.delete(`/posts/${postId}`)

export const getPost = slug => instance.get(`/posts/${slug}`)

export const getFeedPosts = page =>
    instance.get(`/posts?feed=true&offset=${page}&feed_rand=${FEED_RAND}`, {
        headers: { 'Authorization': 'Bearer ' + window.localStorage.token }
    })

export const getTrendingPosts = page => instance.get(`/posts?offset=${page}`)

export const getSearchedPosts = ({ query, page }) =>
    instance.get(`/posts?q=${query}?offset=${page}`)

export const getTagPosts = ({ tag, page }) =>
    instance.get(`/posts?tag=${tag}?offset=${page}`)

export const getProfilePosts = ({ userName, page }) =>
    instance.get(`/posts?profile=${userName}?offset=${page}`)

export const getCommunityPosts = ({ communityName, page }) =>
    instance.get(`/posts?community=${communityName}?offset=${page}`)

export const createPostComment = ({ postId, data }) =>
    instance.post(`/posts/${postId}/comments`, data)

export const updatePostComment = ({ postId, commentId, data }) =>
    instance.put(`/posts/${postId}/comments/${commentId}`, data)

export const deletePostComment = ({ postId, commentId }) =>
    instance.delete(`/posts/${postId}/comments/${commentId}`)

export const getPostComments = ({ postId, page }) =>
    instance.get(`/posts/${postId}/comments?offset=${page}`)

export const createPostLike = ({ postId, data }) =>
    instance.post(`/posts/${postId}/likes`, data)

export const deletePostLike = postId => instance.delete(`/posts/${postId}/likes`)

export const getPostLikes = ({ postId, page }) =>
    instance.get(`/posts/${postId}/likes?offset=${page}`)

export const getTrendingTags = page => instance.get(`/tags?offset=${page}`)

export const getSearchedTags = ({ query, page }) =>
    instance.get(`/tags?query=${query}&offset=${page}`)

/* PARTNERS API */

export const getApiPlans = () => instance.get(`/plans`)

export const getApiPlan = planId => instance.get(`/plans/${planId}`)

export const createPartnerApp = data => instance.post(`/apps`, data)

export const updatePartnerApp = ({ appId, data }) =>
    instance.put(`/apps/${appId}`, data)

export const deletePartnerApp = postId => instance.delete(`/apps/${postId}`)

export const getPartnerApp = appId => instance.get(`/apps/${appId}`)