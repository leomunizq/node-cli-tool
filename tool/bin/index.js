#!/usr/bin/env node
const arg = require('arg');

const args = arg({
  '--start': Boolean,
  '--build': Boolean,
});

console.log(args);