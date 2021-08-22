"use strict";

const express = require("express");
const router = express.Router();
const { Users } = require("../models/index");
const bccrypt = require("bcrypt");
const base64 = require("base-64");
const basicAuth = require("../middleware/signInValidator");

// sign in
router.post("/signin", basicAuth, (req, res) => {});
router.post("/signup", userSignup);

// async function userSignin(req, res) {}

// create a new user
async function userSignup(req, res) {
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

  //2- TODO: check if the user already exists
  const user = await Users.findOne({ where: { username } });
  if (!user) {
    //3- encrypt password
    let hashedPassword = await bccrypt.hash(password, 10);

    //4- create user
    const record = await Users.create({ username, password: hashedPassword });
    res.status(201).json(record);
  } else {
    // already exist
    res.status(401).json({ error: "Invalid credentials User already exist" });
  }
}

module.exports = router;
