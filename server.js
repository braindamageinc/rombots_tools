var connect = require("connect");

connect.createServer(
    connect.logger(),
    connect.static(__dirname + "/static")
).listen(process.env.PORT);

