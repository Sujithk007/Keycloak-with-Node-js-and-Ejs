// Importing packages
const express = require("express");
const Keycloak = require("keycloak-connect");
var session = require("express-session");
var memoryStore = new session.MemoryStore();
const app = express();

const keycloak_json = require("./keycloak.json");

// Keycloak config
// You can get this from the "Installation" tab of your Realm (app) in Keycloak
const keycloakConf = keycloak_json;

// Initializing Keycloak with memory store and Config.
const kc = new Keycloak({ store: memoryStore }, keycloakConf);

// Middle-wares
app.set("view engine", "ejs");
app.use(express.static("public"));

// To set the session to prevent Keycloak middleware from throwing error.
// Always use this before initializing Keycloak middleware.
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

// Keycloak middleware 
app.use(
  kc.middleware({
    logout: "/logout",
    admin: "/",
  })
);

// The "/" route is unprotected. So, we can access without logging in. 
app.get("/", (req, res) => {
  res.render("unprotected", { logStatus: "out"});
});

// We used kc.protect() to redirect to KeyCloak login page.
// Once the user is authenticated it will redirect to "/home" route. 
app.get("/login", kc.protect(), (req, res) => {
  res.redirect("/home");
});

// We have used kc.protect() to protect this route "/home" 
app.get("/home", kc.protect(), (req, res, next) => {
  res.render("home", { logStatus: "in" });
});

// To Logout the user with keycloak using middelware defined above 
app.get("/logout", (req, res, next) => {
  res.send("Logged Out");
});

// Starting server at port 3000
app.listen(3000, () => console.log("Server Started at 3000....."));