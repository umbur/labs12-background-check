const db = require('../../data/dbConfig.js');
const bcrypt = require('bcryptjs');
// call to passportjs: 
const passport = require(passport-facebook);


mudule.exports = server => {
    server.post('api/register', register);
    server.post('api/login', login);
} 

// Register Endpoint here(working on it...):
app.post('/login',
  passport.authenticate('local'),
  function register(req, res) {
    let user = req.body;
    if(user.username && user.password){
        const hash = bcrypt.hashSync(user.password, 4)
        user.password = hash
        db('users').insert(user).then(result => {
            const [id] = result;
            db('users').where({id}).first().then(userAdded => {
                res.status(200).json(userAdded)
            })
            .catch(err => {
                res.status(500).json({'Error accessing DB'})
            }) 
        })
    } .catch(err => {
        res.status(400).json({message: "Error, probably the user already exists"})
        console.log(err);
      })
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

// Example:
function register(req, res) {
    // Implement user registration:
    let user = req.body;
    console.log('1. req.body:', user)
    if(user.username && user.password) {
      const hash = bcrypt.hashSync(user.password, 4)
      user.password = hash
      console.log('2. hashed', user)
      db('users').insert(user).then(result => {
        console.log('3. result:', result)
        const [id] = result;
        db('users').where({id}).first().then(userAdded => {
          res.status(200).json(userAdded)
          console.log('4. userAdded:', userAdded)
        })
        .catch(err => { 
          console.log(err)
          res.status(500).json({message: 'Error accessing DB'})
        })
      })
      .catch(err => {
        res.status(400).json({message: "Error, probably the user already exists"})
        console.log(err);
      })
    } else {
      res.status(422).json({message: "Error, please make sure you've both username & password!"})
    }
  }

  // Login Endpoint here:


    