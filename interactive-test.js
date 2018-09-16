var Client = require('ssh2').Client;

var conn = new Client();
conn.connect({
    host: 'localhost',
    port: 22,
    username: 'radha',
    password:'radha'
    /*privateKey: require('fs').readFileSync('/here/is/my/key')*/
});
conn.on('ready', function() {
    console.log('Client :: ready');
    conn.shell(function(err, stream) {
        if (err) throw err;
        stream.on('close', function() {
            console.log('Stream :: close');
            conn.end();
        }).on('data', function(data) {
            console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
            console.log('STDERR: ' + data);
        });
        stream.end('ls -l\nexit\n');
    });
});