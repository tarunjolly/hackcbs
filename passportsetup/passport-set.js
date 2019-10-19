const passport=require('passport')
const LocalStrategy=require('passport-local')
const FacebookStrategy=require('passport-facebook')
const GoogleStrategy=require('passport-google-oauth2')
const {Users}=require('../database/database')

passport.use(
    new FacebookStrategy(
      {
        clientID: '208166746792404',
        clientSecret: 'ef289776a5abd12f2508ba0479c0df11',
        callbackURL: 'http://localhost:4000/login/fb/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Users.create({
        //     username : profile.id,
        //     fbAccessToken: accessToken,
          
        // })
        //   .then((user) => {
        //     console.log(user)
        //     done(null, user)
        //   })
        //   .catch(done)

        Users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            fbAccessToken: accessToken,
          
        }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
  )

  passport.use(
    new GoogleStrategy(
      {
        clientID: '626825516612-bbnrqokdj19iqliqg0ofmhdclk82asg7.apps.googleusercontent.com',
        clientSecret: 'nOkQ-s6biV7QP-mu8hB8BKtu',
        callbackURL: 'http://localhost:4000/login/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
         // Users.create({
        //   username: profile.id,
        //   ghAccessToken: accessToken,
        // })
        //   .then((user) => {
        //     done(null, user)
        //   })
        //   .catch(done)
        Users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            gAccessToken: accessToken,
          }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
  )
 
  passport.use(
    new LocalStrategy((username,password,done)=>{
      Users.findOne({
        where:{username}
      }).then((user)=>{
         if(!user){
           return done(new Error(`invalid`))
         }
         if(user.password!=password){
           return done(null,false)
         }
         return done(null,user)
      }).catch(done)
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((userId, done) => {
    Users.findOne({
      where: {
        id: userId,
      }
    })
      .then((user) => done(null, user))
      .catch(done)
  })
  module.exports={passport}