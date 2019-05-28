"use strict";

const { src, dest, lastRun } = require("gulp");
const { prettierPlugin } = require("./prettierPlugin");

module.exports = glob => {
  const prettierTask = () => {
    const globs = getGlob(glob);
    console.log(globs);
    return src(globs, { since: lastRun(prettierTask), base: "./" })
      .pipe(prettierPlugin())
      .pipe(dest("./"));
  };

  const getGlob = glob => {
    if (typeof glob === "string") {
      glob = [glob];
    }
    if (glob == null || glob === []) {
      glob = ["./**/*+(.js|.ts|.json|.css|.scss|.sass)"];
    }
    glob = glob.concat(["!node_modules/**", "!docs/**", "!**/*.d.ts"]);
    return glob;
  };

  return prettierTask;
};
