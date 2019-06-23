const fs = require('fs');
const { JSDOM } = require('jsdom');

//Search by CSS Selector on file
const cssQuerySelector = (file, query) => {
    try {
        const attributes = {}
        const sampleFile = fs.readFileSync(file);
        const dom = new JSDOM(sampleFile);

        const response = dom.window.document.querySelector(query);

        if (response) {
            attributes.text = response.textContent.trim()
            
            const array = Array.prototype.slice.apply(response.attributes);

            array.map(attr => attributes[attr.name] = attr.value)

            return { response, attributes }
        }

        return false
    } catch (err) {
        console.log('Error trying to find element by css selector');
        process.exit(1)
    }
}

const findById = (file, id) => {
    try {
        attributes = {}
        const sampleFile = fs.readFileSync(file);
        const dom = new JSDOM(sampleFile);

        const response = dom.window.document.getElementById(id)

        if (response) {
            attributes.tag = response.nodeName.toLowerCase()
            const array = Array.prototype.slice.apply(response.attributes);
            array.map(attr => attributes[attr.name] = attr.value)

            return attributes
        }
        return false
    } catch (err) {
        console.error('Error trying to find element by id', err);
    }
}

const buildQueries = (elements) => {
    let queries = []
    Object.keys(elements).forEach(element => {
        //div[id="success"] button[class*="btn-primary"]
        if (element === 'title' || element === 'id' || element === 'href') {
            queries.push(`${elements[`tag`]}[${element}=\"${elements[`${element}`]}\"]`)
        }
    })

    return queries
}

const parsePath = (element) => {
    let path = element
    let xmlRoute = ""
    
    let el = []

    do {
        el.unshift(element.nodeName + (element.className ? ' class="' + element.className + '"' : ''));
    } while ((element.nodeName.toLowerCase() != 'html') && (element = element.parentNode));

    return el.join(" > ")

}
module.exports = { cssQuerySelector, findById, buildQueries, parsePath }