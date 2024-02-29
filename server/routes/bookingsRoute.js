const router = require("express").Router();
const stripe = require('stripe')(process.env.stripe_key);