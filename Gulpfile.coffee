gulp = require "gulp"
watch = require "gulp-watch"
coffee = require "gulp-coffee"
jade = require "gulp-jade"
nodemon = require "gulp-nodemon"

gulp.task "default", [ "nodemon", "watch-coffee" ]

gulp.task "nodemon", ->
  nodemon
    script: "./build/app.js"
    ext: "js"

gulp.task "watch-coffee", ->
  watch glob: "./src/**/*.coffee"
    .pipe coffee()
    .pipe gulp.dest "./build/"
