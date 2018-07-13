import axios from 'axios';
// import { asyncMddlwr } from './_helpers'

const GIPHY_URL = encodeURI('https://api.giphy.com/v1/gifs/random' +
    '?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13');
const STORAGE_HOST = process.env.REACT_APP_S3_HOST
const FEED_RAND = window.localStorage.feedrand || 1;

axios.defaults.baseURL = process.env.REACT_APP_GATEWAY_HOST
axios.interceptors.response.use(res => res.data, err => null)

const instance = axios.create();
instance.defaults.timeout = 20000
instance.defaults.validateStatus = status => status >= 200 && (status === 422 || status < 300)
instance.interceptors.request.use(
    (conf) => {
        const { token } = window.localStorage
        if (token) conf.headers['Authorization'] = 'Bearer+ ' + token
        return conf
    }
)
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
export const deleteFileFromStorage = url => axios.delete(url)

/* PROFILES */

export const register = data => instance.post(`/users`, data)

export const login = data => instance.post(`/users/login`, data)

export const updateUser = data => instance.put(`/users`, data)

export const getUserProfile = () => instance.get(`/users/profile`)

export const getProfile = name => instance.get(`/users/${name}`)

export const getTrendingProfiles = page => instance.get(`/users?offset=${page}`)

export const getSearchedProfiles = ({ query, page }) =>
    instance.get(`/users?q=${query}&offset=${page}`)

export const getProfileSubscriptions = ({ userId, mode, page }) =>
    instance.get(`/users/${userId}/${mode}?offset=${page}`)

export const createUserSubscription = ({ userId, data }) =>
    instance.post(`/users/${userId}/follow`, data)

export const removeUserSubscription = ({ userId, subscriptionId }) =>
    instance.delete(`/users/${userId}/follow/${subscriptionId}`)

/* COMMUNITIES */

export const createCommunity = data => instance.post(`/communities`, data)

export const updateCommunity = ({ communityId, data }) =>
    instance.put(`/communities/${communityId}`, data)

export const getCommunity = name => instance.get(`/communities/${name}`)

export const getTrendingCommunities = page =>
    instance.get(`/communities?offset=${page}`)

export const getSearchedCommunities = ({ query, page }) =>
    instance.get(`/communities?q=${query}&offset=${page}`)

export const getAdminCommunities = ({ adminId, page }) =>
    instance.get(`/communities?admin=${adminId}&offset=${page}`)

export const getProfileCommunities = ({ userId, page }) =>
    instance.get(`/communities?profile=${userId}&offset=${page}`)

export const getCommunitySubscriptions = ({ communityId, mode, page }) =>
    instance.get(`/communities/${communityId}/${mode}?offset=${page}`)

export const createCommunitySubscription = ({ communityId, data }) =>
    instance.post(`/communities/${communityId}/follow`, data)

export const removeCommunitySubscription = ({ communityId, subscriptionId }) =>
    instance.delete(`/communities/${communityId}/follow/${subscriptionId}`)

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
    instance.get(`/posts?feed=true&offset=${page}&feed_rand=${FEED_RAND}`)

export const getTrendingPosts = page => instance.get(`/posts?offset=${page}`)

export const getSearchedPosts = ({ query, page }) =>
    instance.get(`/posts?q=${query}&offset=${page}`)

export const getTagPosts = ({ tag, page }) =>
    instance.get(`/posts?tag=${tag}&offset=${page}`)

export const getProfilePosts = ({ userId, page }) =>
    instance.get(`/posts?profile=${userId}&offset=${page}`)

export const getCommunityPosts = ({ communityId, page }) =>
    instance.get(`/posts?community=${communityId}&offset=${page}`)

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

export const createPostVote = ({ postId, data }) =>
    instance.post(`/posts/${postId}/votes`, data)

export const deletePostVote = ({ postId, optionId }) =>
    instance.delete(`/posts/${postId}/votes/${optionId}`)

export const getPostVotes = ({ postId, page }) =>
    instance.get(`/posts/${postId}/votes?offset=${page}`)

export const getTrendingTags = page => instance.get(`/tags?offset=${page}`)

export const getSearchedTags = ({ query, page }) =>
    instance.get(`/tags?q=${query}&offset=${page}`)

/* PARTNERS API */

export const getApiPlans = () => instance.get(`/plans`)

export const getApiPlan = planId => instance.get(`/plans/${planId}`)

export const createPartnerApp = data => instance.post(`/apps`, data)

export const updatePartnerApp = ({ appId, data }) =>
    instance.put(`/apps/${appId}`, data)

export const deletePartnerApp = postId => instance.delete(`/apps/${postId}`)

export const getPartnerApp = appId => instance.get(`/apps/${appId}`)