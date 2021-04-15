#!/usr/bin/env node

const utils = require('./utils');
const argv = require('yargs/yargs')(process.argv.slice(2))
	.options({
		 destination: {
			 alias: 'd',
			 description: "Specify a download directory",
			 requiresArg: true,
			 required: false
		 }
	 })
	.argv;

const downloadDestination = argv.destination ? argv.destination : process.cwd();
(async () => await utils.getChromeDriver(downloadDestination))();
