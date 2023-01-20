const express = require("express");
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://127.0.0.1/puntogame');