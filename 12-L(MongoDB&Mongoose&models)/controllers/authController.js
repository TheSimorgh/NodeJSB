const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ roles, accessToken });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };


// const usersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
// const path = require("path");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const fsPromises = require(`fs`).promises;
// const handleLogin = async (req, res) => {
//   const { user, pwd } = req.body;
//   if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
//   const foundUser = usersDB.users.find(person => person.username === user);
//   if (!foundUser) return res.sendStatus(401); //Unauthorized 
//   // evaluate password 
//   const match = await bcrypt.compare(pwd, foundUser.password);
//   if (match) {
//       const roles = Object.values(foundUser.roles);
//       // create JWTs
//       const accessToken = jwt.sign(
//           {
//               "UserInfo": {
//                   "username": foundUser.username,
//                   "roles": roles
//               }
//           },
//           process.env.ACCESS_TOKEN_SECRET,
//           { expiresIn: '30s' }
//       );
//       const refreshToken = jwt.sign(
//           { "username": foundUser.username },
//           process.env.REFRESH_TOKEN_SECRET,
//           { expiresIn: '1d' }
//       );
//       // Saving refreshToken with current user
//       const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
//       const currentUser = { ...foundUser, refreshToken };
//       usersDB.setUsers([...otherUsers, currentUser]);
//       await fsPromises.writeFile(
//           path.join(__dirname, '..', 'model', 'users.json'),
//           JSON.stringify(usersDB.users)
//       );
//       res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
//       res.json({ accessToken,foundUser });
//   } else {
//       res.sendStatus(401);
//   }
// };

// module.exports = { handleLogin };
