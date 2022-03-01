const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");

/* Compilando o sass, adicionando autoprefixed e atualizando a página*/
function compileSass() {
  return gulp
    .src("scss/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}

/* Tarefa do sass*/
gulp.task("sass", compileSass);

/* Unindo todos os arquivos javascripts em um único arquivo*/
function gulpJs() {
  return gulp
    .src("js/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("js/"));
}
/* Tarefa do alljs*/
gulp.task("alljs", gulpJs);

/* Função do browserSync*/
function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}
/* Tarefa do browser-sync*/
gulp.task("browser-sync", browser);

/* Função do watch para alterações em scss e html*/
function watch() {
  gulp.watch("scss/*.scss", compileSass);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("/js/scripts/*.js", gulpJs);
}

/* Tarefa do watch*/
gulp.task("watch", watch);

/* Tarefa do padrão que executa o watch e o browser-sync*/
gulp.task("default", gulp.parallel("watch", "browser-sync", "alljs", "sass"));
