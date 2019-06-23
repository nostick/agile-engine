const fs = require('fs');
const { JSDOM } = require('jsdom');

//Search by CSS Selector on file
const cssQuerySelector = (file, query) => {
    try {
        const attributes = {}
        const sampleFile = fs.readFileSync(file);
        const dom = new JSDOM(sampleFile);

        let response = dom.window.document.querySelector(query);

        if (response) {
            attributes.text = response.textContent.trim()

            const array = Array.prototype.slice.apply(response.attributes);

            array.map(attr => attributes[attr.name] = attr.value)

            if(attributes.class === "btn btn-danger" || attributes.class === "btn btn-warning" || attributes.class === ""){
                query = query+'[class*=\"btn btn-success\"]'
                const subRes = dom.window.document.querySelector(query);
                if(subRes){
                    attributes.text = subRes.textContent.trim()

                    const array = Array.prototype.slice.apply(subRes.attributes);
        
                    array.map(attr => attributes[attr.name] = attr.value)
                    response = subRes
                    return { response, attributes }
                }
                return false
            }
            return { response, attributes }
        }

        return false
    } catch (err) {
        console.log(err)
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
        if (element === 'title' || element === 'id' || element === 'href' || element === 'class') {
            if (element === 'class') {
                let extraParam = (elements['title']) ? "[tile=\""+elements['title']+"\"]" : (elements['href']) ? "[href=\""+elements['href']+"\"]" : false
                if(extraParam){
                    queries.push(`${elements[`tag`]}[${element}=\"${elements[`${element}`]}\"]${extraParam}`)
                }    
            } else {
                queries.push(`${elements[`tag`]}[${element}=\"${elements[`${element}`]}\"]`)
            }


        }
    })
    //console.log(queries)
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