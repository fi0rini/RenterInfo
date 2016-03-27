(function (cproc) {
  const frontend = cproc.spawn('gulp', { cwd: './frontend' });
  const apiserver = cproc.fork('index.js', { cwd: './apiserver' });

  frontend.stdout.on('data', (data) => process.stdout.write(`${data}`));
  frontend.stderr.on('data', (data) => process.stderr.write(`frontend-err: ${data}`));
  frontend.on('close', (code) => process.stdout.write(`child process *frontend* exited with code ${code}`));

  apiserver.on('close', (code) => process.stdout.write(`*apiserver* fork exited with code ${code}`));

}(require('child_process')));
