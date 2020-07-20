const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

app.set('views', './vue'); // specify the views directory
app.set('view engine', 'ejs'); // enregistrer le moteur de template ejs

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser())

app.use(session({
    secret: 'moi j\'ai envi de dormir',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
  }))

//gestion des routes statiques
app.use(express.static('public'));

/*
app.get('/', function (req, res) {
  res.send('Hello World!')
})
*/

app.get('/', function (req, res) {
    console.log(req.body)
    req.session.maVar = "test"
    res.cookie("Miam", "Cookie dans les sac", { maxAge: 900000, httpOnly: true})
 //   res.writeHead(200,"content-type","text/html; charset=utf-8")
  //res.send('<form method="post" action="/" ><input name="nom" type="text" /><input type="submit" value="envoyer"/></form>')
  res.render('index',{nom:["marius","Nader","Voila le noms !!"]})
 // res.end()
})

app.post('/', function (req, res) {
    console.log(req.body)
    console.log('Cookies: ', req.cookies)
    console.log('ma variable de session = ' + req.session.maVar)
   // res.writeHead(200,"content-type","text/html; charset=utf-8")
  res.send('<p>Vous avez saisi le nom : ' + req.body.nom + '</p>')
 res.end()
})

app.get('/test', function (req, res) {
    res.render('test')
  })


app.listen(8880) //     , function () {
  console.log('Example app listening on port 8880 !!!')
//})


/*function monMiddleWare(req,res,next){
    res.writeHead(200,"content-type","text/html; charset=utf-8")
    res.write("<p>il y a une requete</p>")
    next()
}*/
//Fin du code
