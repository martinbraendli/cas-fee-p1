/**
 * Created by FLX on 21.05.2015.
 */
// required modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
// better include, but not necessary
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');


// livereload default
livereload({ start: true });

// sass function: better call sass
gulp.task('sass', function(){
        // read all scss files
        gulp.src('app/scss/*.scss')
        // load sass
        .pipe(sass())
        // prevent gulp from crashing due tu scss files
        .on('error', function (error){
            console.error("there was an scss syntax error -hey check your scss-file");
            this.emit('end');
        })

        // extend autoprefixer for the last 3 browser versions
        .pipe(autoprefixer("last 3 version", "safari 5", "ie 9"))
        // pipe it to css folder
        .pipe(gulp.dest('app/css/'));
    console.log('new css written');
});


//gulp task webserver needs folder app & perform livereload
gulp.task('webserver', function(){
    gulp.src('app')
        .pipe(webserver({
            // webserver options:
            // port 8100: for fun
            port:'8100',
            defaultFile: 'edit.html',
            // lifereload true
            livereload: true,
            //directoryListing: {enable:true, path:'cas-fee-p1'},
            open:true
        })
    );
    console.log('html file written and re-loaded');
});


//watcher-task: look if there is a scss file
gulp.task('watch', function(){
    // add a listener for relaod
    livereload.listen();
    gulp.watch('app/scss/*.scss', ['sass']);
});


//default gulp function: watch task, webservertask
gulp.task('default', ['webserver','watch']);