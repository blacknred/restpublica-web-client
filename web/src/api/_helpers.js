const URL = require('url')
const cheerio = require('cheerio')

export const asyncMiddleware = fn => async (next) => {
    try {
        const { data, status } = await fn(next);
        console.log(data)
        return { ...data, status }
    }
    catch (e) {
        console.log((e.response && e.response.data) || e.message)
    }
}

export const Parser = ({
    url,
    html,
    options = {
        title: true,
        description: true,
        type: true,
        url: true,
        siteName: true,
        charset: true,
        image: true,
        meta: true,
        images: true,
        links: true,
        headers: true,

        keywords: true
    }
}) => {

    const response = {};
    const metaData = {};
    const $ = cheerio.load(html);
    $('script').remove();
    $('style').remove();
    $('applet').remove();
    $('embed').remove();
    $('object').remove();
    $('noscript').remove();

    const meta = $('meta')
    Object.keys(meta).forEach((key) => {
        var attribs = meta[key].attribs;
        if (attribs) {
            if (attribs.property) {
                metaData[attribs.property.toLowerCase()] = attribs.content;
            }
            if (attribs.name) {
                metaData[attribs.name.toLowerCase()] = attribs.content;
            }
            // if (attribs['http-equiv']) {
            //     response.headers[attribs['http-equiv']] = attribs.content;
            // }
        }
    });

    if (options.title) {
        response.title = metaData['og:title'] || $('title').text();
    }
    if (options.description) {
        response.description = metaData['og:description'] || metaData.description;
    }
    if (options.type) {
        response.type = metaData['og:type'];
    }
    if (options.url) {
        const canonicalURL = $("link[rel=canonical]").attr('href')
        let ampURL = $("link[rel=amphtml]").attr('href')
        if (ampURL) ampURL = URL.resolve(url, ampURL);
        response.url = URL.resolve(url, canonicalURL || metaData['og:url'] || url);
        response.originalURL = url;
        response.ampURL = ampURL || null;
    }
    if (options.siteName) {
        const youTubeUsername = $('.yt-user-info a').html()
        console.log(youTubeUsername)
        response.siteName = metaData['og:site_name'];
    }
    if (options.charset) {
        response.charset = $("meta[charset]").attr("charset");
    }
    if (options.image) {
        response.image = metaData['og:image'];
    }
    if (options.meta) {
        response.meta = metaData;
    }
    if (options.images) {
        const imagehash = {};
        response.images = $('img').map((r) => {
            const src = $(this).attr('src')
            console.log(r, src)
            if (src) return URL.resolve(url, src);
            else return ""
        })
            .filter((e, f) => f.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|GIF|PNG)$/) !== null)
            .filter((i, item) => imagehash.hasOwnProperty(item) ? false : (imagehash[item] = true))
            .get()
    }
    if (options.links) {
        const linkhash = {};
        response.links = $('a').map(() => {
            const href = $(this).attr('href')
            if (href && href.trim().length && href[0] !== "#") {
                return URL.resolve(url, href);
            } else return 0;
        })
            .filter((i, item) => {
                if (item === 0) return false
                return linkhash.hasOwnProperty(item) ? false : (linkhash[item] = true);
            })
            .get()
    }


    console.log(response)
    return response
}