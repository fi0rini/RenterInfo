const exec = require('child_process').exec;
const execFile = require('child_process').execFile;

const apiProc = execFile('node', ['.'], {cwd: './apiserver'});
apiProc.stdout.on('data', (data) => process.stdout.write(`${data}`));
apiProc.stderr.on('data', (data) => process.stderr.write(`${data}`));

const feProc = execFile('node', ['.'], {cwd: './frontend'});
feProc.stdout.on('data', (data) => process.stdout.write(`${data}`));
feProc.stderr.on('data', (data) => process.stderr.write(`${data}`));

const gulp = exec('gulp', {cwd: './frontend'});
gulp.stdout.on('data', (data) => process.stdout.write(`${data}`));
gulp.stderr.on('data', (data) => process.stderr.write(`${data}`));

