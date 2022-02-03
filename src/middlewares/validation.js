import errors from '../utils/error.js'
import Joi from 'joi'

const schema = Joi.object({
    orginazer: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required(),

    profession: Joi.string()
    .min(2)
    .max(50)
    .trim()
    .required(),

    organizer_status: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(2)
    .required(),

    contact: Joi.string()
    .pattern(/^998(9[01345789]|6[125679]|7[01234569]|33)[0-9]{7}$/, 'Uzbekistan phone codes')
    .required(),

    title: Joi.string()
    .min(2)
    .max(70)
    .trim()
    .required(),

    sana: Joi.date()
    .greater('now')
    .required(),

    category_id: Joi.number()
    .integer()
    .greater(1)
    .less(7)
    .required(),

    sub_category_id: Joi.number()
    .integer()
    .positive()
    .required(),

    mode: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(2)
    .required(),

    event_link: Joi.link().required(),

    short_info: Joi.string()
    .min(10)
    .max(70)
    .trim()
    .required(),

    long_info: Joi.string()
    .min(30)
    .max(150)
    .trim()
    .required(),

})

const VALIDATE = (req, res, next) => {
    try {
        
        let file = req.files.file

        const {error} = schema.validate(req.body)
        
        if(error) return next(new errors.ClientError(400, error))

        if(file.size / 1024 / 1024 > 5) throw new errors.ClientError(413, "Invalid file size")
        if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) throw new errors.ClientError(415, "Invalid file type")

        return next()
        
    } catch (error) {
        return next(error)
    }
}

export default VALIDATE