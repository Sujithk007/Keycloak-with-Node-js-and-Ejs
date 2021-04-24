const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
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
app.use(bodyParser.urlencoded({ extended: true }));
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
  res.render("login", {
    Logmsg: "",
    logStatus: "out",
    //    logStatus: `${req.session.user ? "in" : "out"}`,
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);
  try {
    const authURL =
      "http://localhost:8080/auth/realms/NodeJs_Token/protocol/openid-connect/token";
    const meta_data = await axios.post(
      authURL,
      new URLSearchParams({
        grant_type: "password", //gave the values directly for testing
        client_id: "backend",
        client_secret: "21946662-e365-4a90-b2ec-4cefd9ade658",
        username: req.body.username,
        password: req.body.password,
      })
    );

    console.log(meta_data.data.access_token);
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }

  //     let webApiUrl = 'example.com/getStuff';
  //     let tokenStr = 'xxyyzz';
  // axios.get(webApiUrl, { headers: {"Authorization" : `Bearer ${tokenStr}`} });
  //     const meta_data = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/auth/realms/Demo-Realm/protocol/openid-connect/token",
  //       data: {
  //         firstName: "Fred",
  //         lastName: "Flintstone",
  //       },
  //     });
  res.send("<h1>Hello World</h1>");
});

app.get("/pro", kc.protect(), (req, res, next) => {
  res.send("pong-protected");
});

app.get("/home", kc.protect(), (req, res, next) => {
  res.render("home", {
    Logmsg: "",
    logStatus: "in",
    //    logStatus: `${req.session.user ? "in" : "out"}`,
  });
});

app.get("/logout", (req, res, next) => {
  res.send("Logged Out");
});

app.listen(3000, () => console.log("Server Started at 3000....."));
// https://stackoverflow.com/questions/52541827/500-error-cannot-exchange-code-for-grant-in-bearer-only-mode-after-successful#:~:text=You%20must%20have%20configured%20the,administrative%20console%20for%20that%20purpose.&text=The%20described%20steps%20to%20protect%20your%20node.