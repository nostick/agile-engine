const path = require('path')
const fs = require('fs');

const validateArgs = (args) => {
    let files = {}
    const root = './test_entries/'
    if(args[2] && args[2] !== '' && validatePath(root+args[2])){
        files.original = root+args[2]
    }

    if(args[3] && args[3] !== '' && validatePath(root+args[3])){
        files.diff = root+args[3]
    }

    files.targetId = (args[4] && args[4] !== '')? args[4] : 'make-everything-ok-button'
    

    if(files.original && files.diff){
        return files
    }

    return false
}

const validatePath = (path) => {
    try{
        if(fs.existsSync(path)){
            return true
        }
        return false
    }catch ( e ){
        return false
    }

}

module.exports = { validateArgs };