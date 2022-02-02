import errors from '../utils/error.js'

const VALIDATE = (req, res, next) => {
    try {
        const [date, month, year] = new Date(Date.now()).toLocaleDateString("uz-UZ").split("/")
        const [hour, minute] = new Date(Date.now()).toLocaleTimeString("uz-UZ").split(/:| /)

        let time = month + '/' + date + '/' + year + ' ' + hour + ':' + minute
        let date2 = new Date(time)
        let milliseconds = date2.getTime()


        let {
            orginazer,
            profession,
            organizer_status,
            contact,
            title,
            sana,
            category_id,
            sub_category_id,
            mode,
            event_link,
            short_info,
            long_info,
        } = req.body
    
        let file = req.files.file

        if(!orginazer) throw new errors.ClientError(400, "orginazer is required")
        if(!profession) throw new errors.ClientError(400, "profession is required")
        if(!organizer_status) throw new errors.ClientError(400, "organizer status is required")
        if(!contact) throw new errors.ClientError(400, "contact is required")
        if(!title) throw new errors.ClientError(400, "title is required")
        if(!sana) throw new errors.ClientError(400, "date is required")
        if(!category_id) throw new errors.ClientError(400, "category id is required")
        if(!sub_category_id) throw new errors.ClientError(400, "sub_category_id is required")
        if(!mode) throw new errors.ClientError(400, "mode is required")
        if(!event_link) throw new errors.ClientError(400, "event link is required")
        if(!short_info) throw new errors.ClientError(400, "short info is required")
        if(!long_info) throw new errors.ClientError(400, "long info is required")

        if(orginazer.length > 50) throw new errors.ClientError(400, "Invalid orginazer")
        if(profession.length > 50) throw new errors.ClientError(400, "Invalid profession")
        if(![1, 2].includes(parseInt(organizer_status))) throw new errors.ClientError(400, "Invalid organizer_status")
        if(!/^998(9[01345789]|6[125679]|7[01234569]|33)[0-9]{7}$/.test(contact)) throw new errors.ClientError(400, "Invalid contact")
        if(title.length > 70) throw new errors.ClientError(400, "Invalid title name")
        if(new Date(sana).getTime() < milliseconds) throw new errors.ClientError(400, "Invalid date")
        if(short_info.length > 500) throw new errors.ClientError(400, "Invalid short_info")
        if(long_info.length > 1000) throw new errors.ClientError(400, "Invalid long_info")

        if(file.size / 1024 / 1024 > 5) throw new errors.ClientError(413, "Invalid file")
        if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) throw new errors.ClientError(415, "Invalid file_type")

        return next()
        
    } catch (error) {
        return next(error)
    }
}

export default VALIDATE