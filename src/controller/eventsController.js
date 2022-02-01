import path from 'path'

const GET = (req, res) => {
    try {
        const [date, month, year] = new Date(Date.now()).toLocaleDateString("uz-UZ").split("/")
        const [hour, minute] = new Date(Date.now()).toLocaleTimeString("uz-UZ").split(/:| /)

        let time = month + '/' + date + '/' + year + ' ' + hour + ':' + minute
        let date2 = new Date(time)
        let milliseconds = date2.getTime()

        const {id} = req.params
        let events = req.select('events')
        events = events.filter(event => event.date > milliseconds)
        
        if(id){
            const ev = events.find(e => e.event_id == id)
            return res.json(ev)
        }else{
            events.sort((a, b) => Number(a.date) - Number(b.date))
            return res.json(events)
        }

    }catch(error){
        return next(error)
    }
}

const POST = async (req, res) => {
    try {
        let {
            orginazer,
            profession,
            organizer_status,
            contact,
            title,
            sana,
            event_link,
            category_id,
            sub_category_id,
            mode,
            short_info,
            long_info,
        } = req.body
    
        const file = await req.files.file

        if(mode == 'offline') {
            mode = 1
        }
        else if(mode == 'online') {
            mode = 2
        }

        category_id = parseInt(category_id)
        sub_category_id = parseInt(sub_category_id)

        let result = new Date(sana)
        sana = result.getTime()
        let events = req.select('events')

        let fileName = (Date.now() % 1000) + file.name.trim()
        file.mv( path.join(process.cwd(), 'src', 'files', fileName) )
        const newEvent = {
            event_id: events.length ? events[events.length - 1].event_id + 1 : 1,
            orginazer,
            profession,
            organizer_status,
            contact,
            imageUrl: fileName,
            event_link,
            title,
            date: sana,
            category_id,
            sub_category_id,
            mode,
            short_info,
            long_info,
            seen: 0,
            status: 1
        }
    
        events.push(newEvent)
        req.insert('events', events)
    } catch (error) {
        console.log(error);
    }
}

const PUT = (req, res) => {
    try {
        const { eventId, seen, eventStatus} = req.body
        let events = req.select('events')
        if(!eventId){
            throw new Error("eventId must be provided")
        }
        let find = events.find(e => e.event_id == eventId)
        if(!find){
            throw new Error("There is no such event!")
        }
        if(typeof eventStatus != 'undefined' && ![1, 2, 3].includes(eventStatus)){
            throw new Error("eventStatus must be valid!")
        }
        if(typeof seen != 'number' && seen || seen < 0){
            throw new Error("seen must be valid!")
        }
        if(seen || eventStatus){
            events.map(e => {
                if(e.event_id == eventId){
                    e.seen = seen ? seen : e.seen
                    e.status = eventStatus? eventStatus : e.status
                }
            })
            req.insert('events', events)
        } 

        res.status(201).json({
            message: "The event has been successfully edited!",
            status: 201
        })
    } catch (error) {
        // return next(error)
        res.json({ message: error.message })
    }
}


export let controllers = {
    GET,
    POST,
    PUT
}