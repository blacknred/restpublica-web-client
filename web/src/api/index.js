import axios from 'axios';
import asyncMddlwr from './asyncMiddleware'

const GIPHY_URL = encodeURI('https://api.giphy.com/v1/gifs/random' +
    '?api_key=dc6zaTOxFJmzC&tag=space&rating=pg-13');
const STORAGE_HOST = process.env.STORAGE_HOST || 'http://127.0.0.1:3007'
const FEED_RAND = window.localStorage.feedrand || 1;

axios.defaults.timeout = 10000
axios.defaults.baseURL = process.env.API_HOST || 'http://127.0.0.1:3003'
axios.defaults.validateStatus = status => status >= 200 && status < 429
const instance = axios.create({
    headers: {
        'Authorization': `Bearer ${window.localStorage.token}`,
    }
});
// axios.interceptors.request.use(req => console.log(req))
// instance.interceptors.response.use(res => console.log(res))

/* PROXY */

export const getProxyPageData = url =>
    axios.get('/proxy?url='  + url)
        .then(res => res.data)
        .catch(e => null)

/* STORAGE */

export const saveFileInStorage = data =>
    axios.post(STORAGE_HOST, data)
        .then(res => res.data)
        .catch(e => null)

/* LANDING */

export const getBackgroundPic = () =>
    axios.get(GIPHY_URL)
        .then(res => res.data)
        .catch(e => null)

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
export const getSearchedProfiles = asyncMddlwr(data => {
    instance.get(`/users?q=${data.query}?offset=${data.page}`)
})
export const createUserSubscription = asyncMddlwr(data =>
    instance.post(`/users/${data.userId}/follow`, { post: data.post })
)
export const removeUserSubscription = asyncMddlwr(data =>
    instance.delete(`/users/${data.userId}/follow/${data.subscriptionId}`)
)
export const getUserSubscriptions = asyncMddlwr(data =>
    instance.get(`/users/${data.userId}/${data.mode}?offset=${data.page}`)
)

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
export const getProfileCommunities = asyncMddlwr(data =>
    instance.get(`/communities?profile=${data.userId}&offset=${data.page}`)
)
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
    instance.post(`/posts`, data)
)
export const updatePost = asyncMddlwr(data =>
    instance.put(`/posts/${data.postId}`, data.post)
)
export const deletePost = asyncMddlwr(postId =>
    instance.delete(`/posts/${postId}`)
)
export const getPost = asyncMddlwr(slug =>
    instance.get(`/posts/${slug}`)
)
export const getFeedPosts = asyncMddlwr(page =>
    instance.get(`/posts?feed=true&offset=${page}&feed_rand=${FEED_RAND}`)
    // axios.get(`/posts?feed=true&offset=${page}&feed_rand=${FEED_RAND}`, {
    //     headers: { 'Authorization': `Bearer ${window.localStorage.token}` }
    // })
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
export const getProfilePosts = asyncMddlwr((userName, page) => {
    instance.get(`/posts?profile=${userName}?offset=${page}`)
})
export const getCommunityPosts = asyncMddlwr((communityName, page) => {
    instance.get(`/posts?community=${communityName}?offset=${page}`)
})


export const createPostComment = asyncMddlwr(data =>
    instance.post(`/posts/${data.postId}/comments`, data.body)
)
export const updatePostComment = asyncMddlwr(data =>
    instance.put(`/posts/${data.postId}/comments/${data.commentId}`, data.body)
)
export const deletePostComment = asyncMddlwr(data =>
    instance.delete(`/posts/${data.postId}/comments/${data.commentId}`)
)
export const getPostComments = asyncMddlwr(data =>
    instance.get(`/posts/${data.postId}/comments?offset=${data.page}`)
)


export const createPostLike = asyncMddlwr(data =>
    instance.post(`/posts/${data.postId}/likes`, data.body)
)
export const deletePostLike = asyncMddlwr(postId =>
    instance.delete(`/posts/${postId}/likes`)
)
export const getPostLikes = asyncMddlwr(data =>
    instance.get(`/posts/${data.postId}/likes?offset=${data.page}`)
)


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