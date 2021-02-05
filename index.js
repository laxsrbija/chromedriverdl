#!/usr/bin/env node

const utils = require('./utils');

(async () => await utils.getChromeDriver())();
