# gulp-vscode-snippet-formatter
Gulp plugin for converting code into VS Code snippets.
The plugin is intended to help with maintaining a large library of snippets by automating the process of generating VS Code snippet bodies from source files.

## Usage

First, install `gulp-vscode-snippet-formatter` as a development dependency:

```shell
npm install --save-dev gulp-vscode-snippet-formatter
```

Then, add it to your `gulpfile.js`:

### Converting source files into snippet bodies for VS Code
```javascript
var snippetFormatter = require('gulp-vscode-snippet-formatter');

gulp.task('generate-snippets', function () {
    return gulp.src('./snippet-source/**/*.js')
        .pipe(snippetFormatter())
        .pipe(gulp.dest('./snippet-output'));
});
```
