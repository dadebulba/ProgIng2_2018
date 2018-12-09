const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const unless = require('express-unless');

const PORT = process.env.PORT || 3000;
const router_answer = require("./api/def/answer.js");
const router_user = require("./api/def/user.js");
const router_token = require('./api/def/token.js');
const router_group = require("./api/def/group");
const router_exam = require("./api/def/exam");
const router_task = require("./api/def/task");

const mwBearerToken = require('express-bearer-token')();
const mwAuth = require('./middleware/mwAuth.js');
const mwErrorHandler = require('./middleware/mwErrorHandler');

mwBearerToken.unless = unless;
mwAuth.unless = unless;

// filter middleware
app.use(bodyParser.json());
app.use(mwBearerToken.unless({path:'/Token'},{path:'/Users', method : 'POST'}));
app.use(mwAuth.unless({path: '/Token'},{path:'/Users', method : 'POST'}));

app.use("/v1/Answers", router_answer);
app.use("/v1/Users", router_user);
app.use("/v1/Token", router_token);
app.use("/v1/Groups", router_group);
app.use("/v1/Exams", router_exam);
app.use("/v1/Tasks", router_task);

app.listen(PORT, () => console.log('ProgIng2 app listening on port '+ PORT));
