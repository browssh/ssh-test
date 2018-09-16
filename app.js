path = require('path')
node_ssh = require('node-ssh')

ssh = new node_ssh()

const password = 'radha'

ssh.connect({
   host: 'localhost',
    username: 'radha',
    port: 22,
    password,
    tryKeyboard: true,
    onKeyboardInteractive:(name, instructions, instructionsLang, prompts, finish) => {
       if(prompts.length > 0 && prompts[0].prompt.toLowerCase().includes('password')){
           finish(['password'])
       }
    }

}).then(() => {
    shell = ssh.requestShell();
    ssh.execCommand('ls -l',{cwd : '/home/radha'}).then( (result) =>{
        console.log('STDOUT', result.stdout);
        console.log('STDERR', result.stderr);
    } )
})
