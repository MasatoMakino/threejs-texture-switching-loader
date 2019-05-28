"use strict";

const through2 = require("through2");
const prettier = require("prettier");

const formatTask = (file, _, cb) => {
  if (file.isBuffer()) {
    const from = file.contents.toString();
    const result = prettier.format(from, {
      filepath: file.path
    });

    if (from !== result) {
      console.log("[prettier] format : " + file.path);
    }
    file.contents = Buffer.from(result);
  }

  cb(null, file);
};

/**
 * gulp用prettierプラグイン。pipe内で呼び出す。
 * @return gulpプラグイン
 */
const prettierPlugin = () => {
  return through2.obj(formatTask);
};
exports.prettierPlugin = prettierPlugin;
