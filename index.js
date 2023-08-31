const express = require('express')
var cors = require('cors')
const multer  = require('multer')


const app = express()
const port = 3050
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.get('/', (req, res) => {

    res.send("merhaba esma")
 
 })

app.post('/test', (req, res) => {

   res.send(JSON.stringify(req.body))

})

app.post("/login", (req, res) => {


    if(req.body.username == "esma123_11@gmail.com" && req.body.password == "123456789"){
        console.log({isLogin:true, message:"Login Başarılı"})
        res.status(200).send({isLogin:true, message:"Login Başarılı"})
    }else{
        console.log({isLogin:false, message:"Kullanıcı adı veya şifre hatalı"})
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
            console.log(data)
            res.status(200).json({message:"Kullanıcı Bilgileri", data:data})
    }else {
        console.log({message:"Kullanıcı Bulunamadı"})
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