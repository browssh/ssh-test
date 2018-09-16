async function run(){
    const node_shh = require('node-ssh')
    let ssh = new node_shh()
    let Password = 'radha'
    await ssh.connect({
        host: 'localhost',
        username:'radha',
        password: 'radha'
    });

        let shellStream = await ssh.requestShell();


    /*shellStream.stdout.on('data', (data) => {
        let stringData = data.toString().trim();

        if (stringData === "[sudo] password for root:") {
            let pass = "radha";
            shellStream.write(pass);
        }else {
            console.log('stdout : data');
        }

    });*/
    shellStream.stderr.on('data', (data) => {
        console.log("stderr : " + data);
    });
    shellStream.write("ls");
}
run()