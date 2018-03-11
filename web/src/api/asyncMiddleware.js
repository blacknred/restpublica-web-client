const asyncMiddleware = fn => async (next) => {
    try { return await fn(next) }
    catch (error) {
        if (error.response) return error.response
        console.log(error.message);
    }
}

export default asyncMiddleware