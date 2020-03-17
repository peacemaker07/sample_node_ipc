const ipc = require("node-ipc");

ipc.config.id = "hello";
ipc.config.retry = 10000;

ipc.connectTo("testpipe", function() {
  ipc.of.testpipe.on("connect", function() {
    ipc.log("## connected to testpipe ##", ipc.config.delay);
    ipc.of.testpipe.emit("app.message", "ping");
  });
  ipc.of.testpipe.on("disconnect", function() {
    ipc.log("disconnected from testpipe");
  });
  ipc.of.testpipe.on("app.message", function(data) {
    ipc.log("got a message from testpipe : ", data);
  });

  console.log(ipc.of.testpipe.destroy);
});
