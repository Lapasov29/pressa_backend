import express from "express";
import os from "os";
import cors from "cors"
import router from "./router/events.js"


const api = os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address
const PORT = process.env.PORT || 4000

import model from "./middlewares/model.js"

const app = express()

app.use( model )
app.use( cors() )
app.use( express.json() )

app.use('/', router)

app.listen(PORT, () => console.log(`Server is running on http://${api}:${PORT}`))