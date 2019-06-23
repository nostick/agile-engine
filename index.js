const paramsService = require('./services/paramsService')
const htmlService = require('./services/htmlService')

const args = paramsService.validateArgs(process.argv) 

if(!args){
    console.log("Looks like there was an error validating files")
    process.exit(1)
}

//If everything is ok then i can try to get my item from original.html

let elements = htmlService.findById(args.original, args.targetId) 

if(elements){
    let queries = htmlService.buildQueries(elements)

    queries.forEach( query => {
        let result = htmlService.cssQuerySelector(args.diff, query) 
        if(result){
            console.log(htmlService.parsePath(result.response))
        }
    })
}



