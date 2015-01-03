// 1. DEPENDENCIES

var gulp         = require('gulp');                      // gulp core
    sass         = require('gulp-sass'),                 // sass compiler
    uglify       = require('gulp-uglify'),               // uglifies the js
    jshint       = require('gulp-jshint'),               // check if js is ok
    rename       = require("gulp-rename"),               // rename files
    concat       = require('gulp-concat'),               // concatinate js
    notify       = require('gulp-notify'),               // send notifications to osx
    plumber      = require('gulp-plumber'),              // disable interuption
    stylish      = require('jshint-stylish'),            // make errors look good in shell
    minifycss    = require('gulp-minify-css'),           // minify the css files
    browserSync  = require('browser-sync'),              // inject code to all devices
    htmlInjector = require("bs-html-injector"),
    autoprefixer = require('gulp-autoprefixer');         // sets missing browserprefixes


// 2. FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)

var target = {
    
<<<<<<< HEAD
    sass_source      : '_dist/_scss/**/*.scss',            // all sass files
    css_dest         : '_dist/_css',                       // where to put minified css
    js_lint_source   : ['_dist/_js/app.js'],               // all js that should be linted
    js_uglify_source : ['_dist/_js/modernizr.js'],         // all js files that should not be concatinated
    js_concat_source : ['_dist/_js/app.js'],               // all js files that should be concatinated
    js_destination   : '_dist/_js'                         // where to put minified js
=======
    sass_source : '_dist/_scss/**/*.scss',                // all sass files
    
    css_dest : '_dist/_css',                               // where to put minified css
    
    js_lint_source : [                                    // all js that should be linted
        '_dist/_js/app.js'
    ],
    js_uglify_source : [                                  // all js files that should not be concatinated
        '_dist/_js/modernizr.js'
    ],
    js_concat_source : [                                  // all js files that should be concatinated
        '_dist/_js/app.js'//,
        //'_dist/_js/app2.js'
    ],
    js_destination : '_dist/_js'                           // where to put minified js
>>>>>>> a5c657a964941227f9aa36873825f31401337518

};

// 3. SASS TASK

gulp.task('sass', function() {
    gulp.src(target.sass_source)                        // get the files
        .pipe(plumber())                                // make sure gulp keeps running on errors
        .pipe(sass())                                   // compile all sass
        .pipe(autoprefixer(                             // complete css with correct vendor prefixes
            'last 2 version',
            '> 1%',
            'ie 8',
            'ie 9',
            'ios 6',
            'android 4'
        ))
        .pipe(minifycss())                              // minify css
        .pipe(gulp.dest(target.css_dest))               // where to put the file
        .pipe(notify({message: 'SCSS processed!'}));    // notify when done
});



// 4. JS TASKS

// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_lint_source)                     // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});

// minify all js files that should not be concatinated
gulp.task('js-uglify', function() {
    gulp.src(target.js_uglify_source)                   // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(rename(function(path){                    // give the files a min suffix
                path.dirname += "./_js";
                path.basename += "";
                path.extname = ".min.js"
        }))
        .pipe(gulp.dest(target.js_destination))          // where to put the files
        .pipe(notify({ message: 'That\'s Ugly!'}));      // notify when done
});

// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(target.js_concat_source)                    // get the files
        .pipe(uglify())                                  // uglify the files
        .pipe(concat('scripts.min.js'))                  // concatinate to one file
        .pipe(gulp.dest(target.js_destination))          // where to put the files
        .pipe(notify({message: 'Minify & Concatinate'}));// notify when done
});

// 5. BROWSER SYNC

gulp.task('browser-sync', function() {
    browserSync.use(htmlInjector, {});
    browserSync.init(['_dist/_css/**/*.css', '_dist/_js/**/*.js'], {// files to inject
        server: { baseDir: "./" }
    });
});

// 6. GULP TASKS

gulp.task('default', ['sass', 'js-lint', 'js-uglify', 'js-concat', 'browser-sync'], function() {  
    gulp.watch("*.html", htmlInjector);
    gulp.watch('_dist/_scss/**/*.scss', function() { gulp.start('sass'); });
    gulp.watch(target.js_lint_source, function() { gulp.start('js-lint'); });
    gulp.watch(target.js_uglify_source, function() { gulp.start('js-uglify'); });
    gulp.watch(target.js_concat_source, function() { gulp.start('js-concat'); });
});