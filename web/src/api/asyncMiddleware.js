const asyncMiddleware = fn => async (next) => {
    try {
        const { data, status } = await fn(next);
        console.log(data)
        return { ...data, status }
    }
    catch (e) {
        return !e.response || e.response.status === 500 ?
            'Server error. Try later.' :
            e.response.data
    }
}

export default asyncMiddleware