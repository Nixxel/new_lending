var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		minifycss    = require('gulp-minify-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),		
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify');
		imagemin 	 = require('gulp-imagemin');
		spritesmith  = require('gulp.spritesmith');
		livereload  = require('gulp-livereload');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "app"
				},
				notify: false
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(minifycss({
		keepBreaks: true
	}))
	.pipe(gulp.dest('app/css'))		
	.pipe(livereload());
});

gulp.task('compress-img', function () {
	return gulp.src('app/img/*')
        .pipe(imagemin({ proressive: true }))
        .pipe(gulp.dest('app/img'));
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('app/img/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: '../img/sprite.png',
                cssName: 'sprite.sass',                
                algorithm: 'binary-tree'                
            }));

    spriteData.img.pipe(gulp.dest('app/img')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('sprite/')); // путь, куда сохраняем стили
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/modernizr/modernizr.js',
		'app/libs/jquery/jquery-1.12.4.min.js',
		'app/libs/jquery/jquery-ui.min.js',
		'app/libs/waypoints/waypoints.min.js',
		'app/libs/animate/animate-css.js',
		'app/libs/plugins-scroll/plugins-scroll.js',
		'app/libs/owl.carousel/owl.carousel.min.js',
		'app/libs/matchMedia/matchMedia.js',
		'app/libs/matchMedia/matchMedia.addListener.js'
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('app/js/'));
});

gulp.task('watch', function () {
	 var server = livereload({ start: true });	
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch', 'compress-img', 'sprite']);
