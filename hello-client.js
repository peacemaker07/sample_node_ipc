const ipc = require("node-ipc");

ipc.config.id = "hello";
ipc.config.retry = 10000;

ipc.connectTo("testpipe", function() {
  ipc.of.testpipe.on("connect", function() {
    ipc.log("## connected to testpipe ##", ipc.config.delay);
    // ipc.of.testpipe.emit("app.message", "ping client1");
  });
  ipc.of.testpipe.on("disconnect", function() {
    ipc.log("disconnected from testpipe");
  });
  ipc.of.testpipe.on("app.message", function(data) {
    ipc.log("got a message from testpipe : ", data);
  });
  ipc.of.testpipe.on("app.message2", function(data) {
    ipc.log("got a message from testpipe : ", data);
  });

  console.log(ipc.of.testpipe.destroy);
});

setTimeout(function(){
  ipc.of.testpipe.emit("app.message", "[message]ping client1");
}, 5000);

setTimeout(function(){
  ipc.of.testpipe.emit("app.message2", "[message2]ping client1");
}, 10000);
