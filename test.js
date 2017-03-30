var spawn = require('child_process').spawn,
py = spawn('python', ['helloworld.py']);

py.stdin.write("Hello");
py.stdin.end();

while(1) {
  py.stdout.on('data', function(data) {
    console.log(data);
  })
}
