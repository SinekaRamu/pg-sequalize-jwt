const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");

const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { notfound } = require("./middlewares/notFound.middleware");

const userRouter = require("./routes/user.router");
const itemRouter = require("./routes/items.router");

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

//routers
app.use("/", userRouter);
app.use("/items", itemRouter);

app.use(notfound);
app.use(errorHandler);

app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
