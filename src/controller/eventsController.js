const GET = (req, res) => {
    try {
        const {id} = req.params
        let events = req.select('events')
        events.map(e => {
            delete e.organizer_status
        })
        
        if(id){
            const ev = events.find(e => e.event_id == id)
            return res.json(ev)
        }else{
            return res.json(events)
        }

    }catch(error){
        return next(error)
    }
}

const POST = (req, res) => {
    
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