"use strict";

const { series, parallel, watch } = require("gulp");

const doc = require("gulptask-tsdoc")();
const server = require("gulptask-dev-server")("./docs/demo");
const { bundleDevelopment, watchBundle } = require("gulptask-webpack")(
  "./webpack.config.js"
);
const { tsc, watchTsc } = require("gulptask-tsc")();

const prettierGlob = ["./**/*+(.js|.ts|.json|.css|.scss|.sass)", "!bin/**"];
const prettier = require("./prettier")(prettierGlob);
exports.prettierTask = prettier;

const watchTasks = cb => {
  watchBundle();
  watchTsc();
  cb();
};

exports.start_dev = series(watchTasks, server);
exports.build = series(prettier, tsc, parallel(bundleDevelopment, doc));
