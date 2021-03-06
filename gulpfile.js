
var gulp   = require('gulp')
    sass   = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower  = require('gulp-bower')
    uglify = require('gulp-uglify')
    browserSync = require('browser-sync').create();

var config = {
     sassPath: './resources/sass',
    jsPath:   './resources/js',
     bowerDir: './bower_components' 
}


gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./web/dist/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./web/dist/css')); 
});

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});


gulp.task('js', function() {
  return gulp.src([config.jsPath + '/*.js', config.bowerDir + '/jquery/dist/jquery.min.js', config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./web/dist/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://gulp-skeleton.local"
    });
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css', 'js']);