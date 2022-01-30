const GET = (req, res) => {
    try {
        const {id} = req.params

        let events = req.select('events')
        
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

export let controllers = {
    GET
}