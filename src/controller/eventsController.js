import path from 'path'
import errors from '../utils/error.js'
import fs from 'fs'

function timeConverter(milliseconds) {
    const [date, month, year] = new Date(milliseconds).toLocaleDateString("uz-UZ").split("/")
    const [hour, minute] = new Date(milliseconds).toLocaleTimeString("uz-UZ").split(/:| /)
    let time = month + '/' + date + '/' + year + ' ' + hour + ':' + minute
    return time
}

function responseSender(response, event, message) {
    response.status(201).json({
        event,
        message
    })
}

const GET = (req, res, next) => {
    try {
        let date = new Date(timeConverter(Date.now()))
        let currentTime = date.getTime()

        const {id} = req.params
        let events = req.select('events')
        events = events.filter((event, i)=> {
            if(event.date > currentTime) return event
            // fs.unlinkSync(path.join(process.cwd(), 'src', 'files', event.imageUrl))

        })
        req.insert('events', events)
        if(id){
            const ev = events.find(e => e.event_id == id)
            return responseSender(res, ev, ev ? "OK": "There is no such event")
        }else{
            events.sort((a, b) => Number(a.date) - Number(b.date))
            events.map(e => {
                e.date = timeConverter(e.date)
            })
            return responseSender(res, events, "OK")
        }

    }catch(error){
        return next(error)
    }
}

const POST = async (req, res, next) => {
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

        sana = new Date(sana).getTime()

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

        return responseSender(res, newEvent, "The event has been added!")

    } catch (error) {
        return next(error)
    }
}

const PUT = (req, res, next) => {
    try {
        const { eventId, eventStatus} = req.body
        let events = req.select('events')
        if(!eventId){
            throw new errors.ClientError(400, "eventId must be provided")
        }

        let find = events.find(e => e.event_id == eventId)
        if(!find){
            throw new errors.ClientError(404, "There is no such event!")
        }
        
        const {path} = req.route
        if(eventStatus){
            if(path != '/admin'){
                throw new errors.ClientError(400, "Invalid request!")
            }
            if(!(typeof eventStatus == 'number') || ![1, 2, 3].includes(eventStatus)){
                throw new errors.ClientError(400, "eventStatus must be valid!")
            }
            
            find.status = eventStatus ? eventStatus : find.status
        }

        find.seen = eventStatus ? find.seen : find.seen + 1

        req.insert('events', events)
        
        return responseSender(res, find, "The event has been updated!")

    } catch (error) {
        return next(error)
    }
}

export const controllers = {
    GET,
    POST,
    PUT
}