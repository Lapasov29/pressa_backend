import path from 'path'
import fs from 'fs'
// import { ServerError } from '../utils/error.js'

const model = (req, res, next) => {
    req.select = function (fileName) {
        try {
            let files = fs.readFileSync(path.join(process.cwd(), 'src', 'database', fileName + '.json'), "UTF-8")
            files = files ? JSON.parse(files) : []
            return files
        } catch (error) {
            throw new Error(error.message)
			// return next( new ServerError(error.message) )
        }
    }

    req.insert = function (fileName, data) {
        try{
            fs.writeFileSync(path.join(process.cwd(), 'src', 'database', fileName + '.json'), JSON.stringify(data, null, 4))
            return true
        }catch(error){
            throw new Error(error.message)
			// return next( new ServerError(error.message) )
        }
    }
    return next()
}

export default model