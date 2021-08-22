"use strict";
const { Users } = require("../models/index");
const bccrypt = require("bcrypt");
const base64 = require("base-64");

module.exports = async (req, res, next) => {
  /*
   * first we need to get the credentials from the request
   */

  //1- get user info from the request.
  let authHeader = req.headers.authorization;
  // ['Basic username:password']
  console.log(authHeader);

  // let encodedCreditentials = authHeader.split(' ')[1];
  let encodedCreditentials = authHeader.split(" ").pop();

  let decodedCreditentials = base64.decode(encodedCreditentials);
  // username:password
  console.log(decodedCreditentials);

  let [username, password] = decodedCreditentials.split(":");

  // get the user from the database
  const user = await Users.findOne({ where: { username } });
  // compare the password, to make sure that the user is the one that is trying to sign in
  if (user) {
    const isValid = await bccrypt.compare(password, user.password);
    if (isValid) {
      // success
      res.status(200).json(user);
    } else {
      // unauthenticated
      res.status(401).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};
