var gulp = require('gulp');
var rimraf  = require('rimraf');
var fs     = require('fs');
var cheerio     = require('cheerio');

gulp.task('dist', function(done) {

    //remove old dist js,css,ico, font files from laravel public folder and index.html from views
    rimraf.sync('./../backend/public/*.js');
    rimraf.sync('./../backend/public/*.map');  // for dev build
    rimraf.sync('./../backend/public/*.css');
    rimraf.sync('./../backend/public/*.ico');
    rimraf.sync('./../backend/public/*.woff2');
    rimraf.sync('./../backend/public/*.svg');
    rimraf.sync('./../backend/public/*.woff');
    rimraf.sync('./../backend/public/*.eot');
    rimraf.sync('./../backend/public/*.ttf');
    rimraf.sync('./../backend/public/*.otf');
    rimraf.sync('./../backend/public/assets');
    rimraf.sync('./../backend/resources/views/index.html');

    //copy dist folder into laravel public folder
    //gulp.src(['./dist/**/*', '!./dist/index.html']).pipe(gulp.dest('./../backend/public'));

    //gulp.src(['./dist/index.html']).pipe(gulp.dest('./../backend/resources/views'));

    done();
});