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

}


export let controllers = {
    GET,
    POST,
    PUT
}