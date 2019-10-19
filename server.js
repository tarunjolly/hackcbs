const express = require('express');
const app = express();
const {db,Users} = require('./database/database');
const session=require('express-session')

const {passport}=require('./passportsetup/passport-set');
// const userroute = require('./routes/user');
// const vendorroute=require('./routes/vendor');

app.set('view engine','hbs');
app.use(express.json())
app.use(express.urlencoded(({ extended: true })))

app.use(session({
    secret:'abcd efgh ijkl',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*60,
    }
}))


app.use(express.static('/public'))
app.use('/',express.static(__dirname+'/public'))

app.use(passport.initialize())
app.use(passport.session())


app.get('/login/fb', passport.authenticate('facebook'))
app.get('/login/fb/callback', passport.authenticate('facebook', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))


app.get('/login/google', passport.authenticate('google',{ scope:
  [ 'email', 'profile' ] }
  ))

app.get('/login/google/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))


app.get('/adddetails',(req,res)=>{
    res.render('adddetails')
})

app.get('/',function(req,res){
    res.render('home');
})

app.get('/history',function(req,res){
    res.render('history')
})



app.get('/appointment',function(req,res){
    res.render('appointment')
})


















//login page
app.get('/login',(req,res)=>{
    res.render('login')
})


// //authenitcate the person
app.post('/login',passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/'}),function(req,res){
    console.log(req.user)
    
})

// //signup
app.post('/signup',(req,res)=>{
    if(req.body.usertype=='doctor'){
    Users.create(
        {
            username:req.body.username,
            password:req.body.password,
            usertype:req.body.usertype,
            speciality:req.body.speciality,
            clinic:req.body.usertype,
            experience:req.body.experience,
            phone:req.body.phone
        })
        .then((user)=>{
           // console.log(user)
            res.redirect('/login')
        })
        .catch((err)=>{
            console.log(err)
            res.redirect('/signup')
        })}
    else{
        Users.create(
                {
                    username:req.body.username,
                    password:req.body.password,
                    email:req.body.email,
                    usertype:req.body.usertype,
                    phone:req.body.phone
                })
                .then((user)=>{
                   // console.log(user)
                    res.redirect('/login')
                })
                .catch((err)=>{
                    console.log(err)
                    res.redirect('/signup')
                })
    }
})


//signup page
app.get('/signup',(req,res)=>{
    res.render('signup')
})






// app.get('/logout',(req,res)=>{
//     req.logout();
//     res.redirect('/user/')
// })



db.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('server started at http://localhost:4000')
    })
})