const asyncMiddleware = fn => async (next) => {
    try { 
        const res = await fn(next);
        console.log({ ...res.data, ...res.status });
        return { ...res.data, ...res.status };
    }
    catch (error) {
        console.log(error.message);
        return error.response || null;
    }
}

export default asyncMiddleware