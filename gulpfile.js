/**
 * Created by FLX on 21.05.2015.
 */
// required modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
// better include, but not necessary
var less = require('gulp-less');
var livereload = require('gulp-livereload');


// livereload default
livereload({ start: true });

// sass function: better call sass
gulp.task('sass', function(){
   gulp.src('app/scss/*.scss')
        .pipe(sass())
        // pipe it to css folder
        .pipe(gulp.dest('app/css/'));
        // call a livereload for css-file
        //.pipe(livereload());
        console.log('new css written');
});


//gulp task webserver needs folder app & perform livereload
gulp.task('webserver', function(){
    gulp.src('app')
        .pipe(webserver({
            // webserver options:
            // port 8100: for fun
            port:'8100',
            defaultFile: 'index.html',
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