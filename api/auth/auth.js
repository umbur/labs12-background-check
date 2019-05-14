const db = require('../../data/dbConfig.js');
const bcrypt = require('bcryptjs');
// call to passportjs: 
const passport = require(passport-facebook);


mudule.exports = server => {
    server.post('api/register', register);
    server.post('api/login', login);
} 

// Register Endpoint here(working on it...):
app.post('/register',
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

// Login Endpoint here:
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
    function login(req, res) {
        // implement user login
        let { username, password } = req.body;
        db('auth').where('username', username).first().then(user => {
          console.log('user object:', user)
          if(user && bcrypt.compareSync(password, user.password)) {
            //console.log('user.password:', user.password, 'password:', password)
            const token = generateToken(user);
            //console.log('useraftertoken:', user, token)
            res.status(200).json({ message: `Login completed for ${user.username}`, token })
          } else {
            res.status(401).json({ message: 'Invalid credentioals!' });
          } 
        }) .catch(err => {
          console.log(err)
          res.status(422).json({message: "Error, probably you've made a mistake"})
        })
      
      }   
  });

  // Example: 
  app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });


    