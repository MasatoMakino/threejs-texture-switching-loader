const { src, dest, lastRun } = require("gulp");
const through2 = require("through2");
const prettier = require("prettier");

const prettierTask = () => {
  const getParser = file => {
    switch (file.extname) {
      case ".ts":
        return "typescript";
      case ".json":
        return "json";
      case ".js":
      case ".mjs":
        return "babel";
    }
  };

  const formatTask = (file, _, cb) => {
    if (file.isBuffer()) {
      const from = file.contents.toString();
      const result = prettier.format(from, {
        parser: getParser(file)
      });

      if (from !== result) {
        console.log("[prettier] format : " + file.path);
      }
      file.contents = Buffer.from(result);
    }

    cb(null, file);
  };

  const addDefaultIgnore = globs => {
    globs.push("!node_modules/**");
    globs.push("!docs/**");
    globs.push("!**/*.d.ts");
    return globs;
  };

  let globs = ["./**/*+(.js|.ts|.json)"];
  globs = addDefaultIgnore(globs);

  return src(globs, { since: lastRun(prettierTask) })
    .pipe(through2.obj(formatTask))
    .pipe(dest("./prettiered"));
};

exports.prettierTask = prettierTask;
