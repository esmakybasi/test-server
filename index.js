const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 3050

app.get('/', (req, res) => {

   res.send(JSON.stringify(req.body))

})

app.post('/', upload.single("profileImage"), (req, res) => {

    //upload file uploads folder
    console.log(req.file)
    console.log(req.body)
    res.send("Dosya Yüklendi")

})



app.listen(port, () => {
console.log(`Example app listening at http://localhost:port`)
})