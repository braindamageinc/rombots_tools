var connect = require("connect");

var app = connect.createServer();

app.use(connect.logger());
app.use("/", connect.static(__dirname + "/static"));
//app.use("/", connect.directory(__dirname + "/node_modules"));

app.listen(process.env.PORT);

