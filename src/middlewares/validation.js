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

        if(!orginazer) throw new Error( "orginazer is required")
        if(!profession) throw new Error( "profession is required")
        if(!organizer_status) throw new Error( "organizer_status is required")
        if(!contact) throw new Error( "contact is required")
        if(!title) throw new Error( "title is required")
        if(!sana) throw new Error( "date is required")
        if(!category_id) throw new Error( "category_id is required")
        if(!sub_category_id) throw new Error( "sub_category_id is required")
        if(!mode) throw new Error( "mode is required")
        if(!event_link) throw new Error( "event_link is required")
        if(!short_info) throw new Error( "short_info is required")
        if(!long_info) throw new Error( "long_info is required")

        if(orginazer.length > 50) throw new Error("Invalid orginazer")
        if(profession.length > 50) throw new Error("Invalid profession")
        if(![1, 2].includes(parseInt(organizer_status))) throw new Error("Invalid organizer_status")
        if(!/^998(9[01345789]|6[125679]|7[01234569]|33)[0-9]{7}$/.test(contact)) throw new Error("Invalid contact")
        if(title.length > 70) throw new Error("Invalid title name")
        if(new Date(sana).getTime() < milliseconds) throw new Error("Invalid date")
        if(short_info.length > 500) throw new Error("Invalid short_info")
        if(long_info.length > 1000) throw new Error("Invalid long_info")

        if(file.size / 1024 / 1024 > 5) throw new Error("Invalid file")
        if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) throw new Error("Invalid file_type")

        res.send({
            status: 200,
            message: "ok"
        })
        return next()
    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}

export default VALIDATE