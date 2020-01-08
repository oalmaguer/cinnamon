var express = require("express");
var mongojs = require("mongojs");
var path = require("path");
import axios from "axios";

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var databaseUrl = "mynotes";
var collections = ["notes"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("db error", error);
});

app.post("/submit", function(req, res) {
  db.notes.insert(req.body, function(error, saved) {
    if (error) {
      console.log(error);
    } else {
      res.send(saved);
    }
  });
});
