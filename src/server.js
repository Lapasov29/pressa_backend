import express from "express";
import cors from "cors"
import router from "./router/events.js"
import fileUpload  from "express-fileupload"
import path from 'path'

const PORT = process.env.PORT || 4000
const app = express()

import model from "./middlewares/model.js"

app.use( model )
app.use( cors() )
app.use(fileUpload())
app.use( express.json() )
app.use('/', router)

app.get('/images/:imageName', (req, res) => {
    let imageName = req.params.imageName
    res.sendFile(path.join(process.cwd(), 'src', 'files', imageName))
})


app.listen(PORT, () => console.log(`Server is running on http://localhost:4000`))