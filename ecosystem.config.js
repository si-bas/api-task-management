module.exports = {
    apps: [{
        name: 'Task Management API',
        script: 'node',
        args: 'dist/main.js',
        watch: false,
        error_file: 'temp/logs/error.log',
        out_file: 'temp/logs/out.log',
        log_file: `temp/logs/app-combined.log`,
        time: true
    }]
};