"use strict";

module.exports = (req, res, next) => {
  if (req.query.name) {
    res.status(200).json({ name: `${req.query.name}` });
  } else {
    next("Error No Name");
  }
};
