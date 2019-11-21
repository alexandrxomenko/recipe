const express = require('express');
const http = require('http');
const  nl2br = require('nl2br');
const BodyParser = require('body-parser');
const mysql = require("mysql");
const Cookies = require('cookies');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const FirstCourse = require('./models/recipe.js');
const User = require('./models/user.js');
const Sequelize = require("sequelize");
const sequelize = new Sequelize("user", "root", "my-secret-pw", {
    dialect: "mysql",
    host: "172.17.0.2",
    define: {
        timestamps: false
    }
});



const app = express();

app.set('view engine', 'ejs');
app.engine('ejs',require('ejs-locals'));
app.listen(process.env.PORT);
const urlencodedParser = BodyParser.urlencoded({extended: false});
app.use('/public', express.static('public'));

app.use(cookieParser());
app.use(session({secret:"secret"}));




sequelize.sync().then(()=>{
    console.log('SYNC DB');
})
    .catch(err=> console.log(err));



 app.get('/', function (req, res) {
     let names = req.cookies.USERLOGIN;
     res.render("recipe",{logine: names});

 });

 app.get('/recipe/:name', function(req,res){
     const CoName = req.params.name;
     FirstCourse.findAll( { where: {urSer:CoName},limit:6, raw:true})
         .then(data=>{
             res.render('recipeID',{data, CoName});

         });

 });

app.get('/securelogin', function(req,res){
    res.render('securelogin');
});

app.post('/securelogin', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
        let login = req.body.login;
       let password = req.body.password;
    User.findAll({
        where: {login: login, password: password}, raw:true
    }).then(result=>{
        var logines = result[0];
        console.log(logines.login);
        res.cookie("USERLOGIN", logines.login);
        res.redirect('/');
    }).catch(err=>console.log(err));



});



 app.get('/registration', function(req,res){
    res.render('about');
 });



 app.post('/registration', urlencodedParser, function (req, res) {
        if(!req.body) return res.sendStatus(400);
     console.log(req.body);
        User.create({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password
        }).then(res=>{

            console.log(res);
          }).catch(err=>console.log(err));

     res.cookie("USERLOGIN", req.body.login);
     res.redirect('/');
 });


app.get('/create/:courId', function(req,res){
    const courseID = req.params.courId;
    res.render('create.ejs',{courseID});
});

app.post('/addrecept', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
   FirstCourse.create({
        urSer: req.body.urSer,
        name: req.body.name,
        recept: req.body.recept,
        image: req.body.image
    }).then(res=>{
        console.log('DB CREATE');
    }).catch(err=>console.log(err));


    res.render('recipe');
});

app.get('/course/:id', function(req,res){
    const id = req.params.id;
    FirstCourse.findAll( { where: {id:id},  raw:true})
        .then(datas=>{

          let  nl2br = (str, isXhtml = false) => {
                const breakTag = isXhtml ? '<br/>' : '<br>';
                return String(str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
            };

            const data = datas.map(item => {
                return {
                    ...item,
                    recept: nl2br(item.recept)
                };
            });
            console.log(data);
            res.render('id.ejs',{data});

        });

});;;;;
dsjfhkjsdfjsjkdhfjksdjkfkhsdj
kjdfgkldflkglkdsf