const express = require("express");
const Keycloak = require("keycloak-connect");
var session = require("express-session");
var memoryStore = new session.MemoryStore();
const app = express();

// Keycloak config
// You can get this from the "Installation" tab of your Realm (app) in Keycloak
const keycloakConf = {
  realm: "NodeJs_Token",
  "auth-server-url": "http://localhost:8080/auth/",
  "ssl-required": "external",
  resource: "backend",
  credentials: {
    secret: "21946662-e365-4a90-b2ec-4cefd9ade658",
  },
  "confidential-port": 0,
};

const kc = new Keycloak({ store: memoryStore }, keycloakConf);

// Middle-wares
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(
  kc.middleware({
    logout: "/logout",
    admin: "/",
  })
);


app.get("/", (req, res) => {
  res.render("unprotected", { logStatus: "out"});
});

app.get("/login", kc.protect(), (req, res) => {
  res.redirect("/home");
});

app.get("/home", kc.protect(), (req, res, next) => {
  res.render("home", { logStatus: "in" });
});

app.get("/logout", (req, res, next) => {
  res.send("Logged Out");
});

app.listen(3000, () => console.log("Server Started at 3000....."));