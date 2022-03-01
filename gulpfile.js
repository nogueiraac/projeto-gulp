const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

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
}

/* Tarefa do watch*/
gulp.task("watch", watch);

/* Tarefa do padrão que executa o watch e o browser-sync*/
gulp.task("default", gulp.parallel("watch", "browser-sync"));
