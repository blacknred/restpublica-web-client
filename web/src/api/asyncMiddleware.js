const asyncMiddleware = fn => async (next) => {
    try {
        const res = await fn(next);
        console.log(window.localStorage.token)
        console.log({ ...res.data, status: res.status });
        return { ...res.data, status: res.status };
    }
    catch (e) {
        return e.response && e.response.status !== 500 ?
            e.response.data.message :
            'Server error. Try later.'
    }
}

export default asyncMiddleware