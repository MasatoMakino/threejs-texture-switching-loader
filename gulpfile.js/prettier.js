"use strict";

const { src, dest, lastRun } = require("gulp");
const { prettierPlugin } = require("./prettierPlugin");

const prettierTask = () => {
  const addDefaultIgnore = globs => {
    globs.push("!node_modules/**");
    globs.push("!docs/**");
    globs.push("!**/*.d.ts");
    return globs;
  };

  let globs = ["./**/*+(.js|.ts|.json)"];
  globs = addDefaultIgnore(globs);

  return src(globs, { since: lastRun(prettierTask) })
    .pipe(prettierPlugin())
    .pipe(dest("./"));
};

exports.prettierTask = prettierTask;
