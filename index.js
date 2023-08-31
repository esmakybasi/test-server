const express = require('express')
var cors = require('cors')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const port = 3050
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    res.send("merhaba esma")
 
 })

app.post('/test', (req, res) => {

   res.send(JSON.stringify(req.body))

})

app.post("/login", (req, res) => {


    if(req.body.username == "esma123_11@gmail.com" && req.body.password == "123456789"){
        res.status(200).send({isLogin:true, message:"Login Başarılı"})
    }else{
        res.status(500).json({status:false, message:"Kullanıcı adı veya şifre hatalı"})
    }

   
 })

 app.get("/userInfo/:username", (req, res) => {

    if(req.params.username == "esmakoybasi"){

        var data = {
            username: 'esmakoybasi',
            bio: 'Biyografi...',
            avatar: '/img/pp.jpg',
            pins: [
              { id: 1, title: '', image: '/img/bg.jpg' },
              { id: 2, title: '', image: '/img/ee.jpg' },
              // ...
            ],
            savedPosts: [
              { id: 1, title: 'Kaydedilen Gönderi Başlık 1', image: '/img/m.jpg' },
              { id: 2, title: 'Kaydedilen Gönderi Başlık 2', image: '/img/m.jpg' },
              // ...
            ]
          }
    
            res.status(200).json({message:"Kullanıcı Bilgileri", data:data})
    }else {
        res.status(404).json({message:"Kullanıcı Bulunamadı"})
    }



})

app.post('/upload', upload.single("profileImage"), (req, res) => {

    //upload file uploads folder
    console.log(req.file)
    console.log(req.body)
    res.send("Dosya Yüklendi")

})



app.listen(port, () => {
console.log(`Example app listening at http://localhost:`+port)
})