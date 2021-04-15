const findChromeVersion = require('find-chrome-version');
const https = require('https');
const os = require('os');
const unzip = require('unzipper');
const { transform } = require('camaro');

const CHROME_DRIVER_REPOSITORY = 'https://chromedriver.storage.googleapis.com/';

exports.getChromeDriver = async function () {
	const availableDrivers = await getAvailableDriverVersions();
	const chromeVersion = await findChromeVersion();

	const closestDriverVersion = findClosestDriverVersion(chromeVersion, availableDrivers);
	const platform = getPlatformInfo();

	console.log('Installed Chrome has version ' + chromeVersion);
	console.log('Downloading ChromeDriver ' + closestDriverVersion + ' for ' + platform + '...');
	await downloadChromeDriver(closestDriverVersion, platform);
};

const downloadChromeDriver = async function (driverVersion, platform) {
	const driverUrl = CHROME_DRIVER_REPOSITORY + driverVersion + '/chromedriver_' + platform + '.zip';
	const downloadPath = process.cwd();
	return https.get(driverUrl, res => res.pipe(unzip.Extract({path: downloadPath})));
};

const findClosestDriverVersion = function (targetVersion, availableDrivers) {
	const majorVersion = targetVersion.slice(0, targetVersion.indexOf('.'));
	return availableDrivers.reverse()
		.find(version => version.startsWith(majorVersion));
};

const getPlatformInfo = function () {
	const platform = os.platform();

	switch (platform)
	{
	case 'win32':
		return platform;
	case 'darwin':
		return 'mac64';
	default:
		return 'linux64';
	}
};

const getAvailableDriverVersions = async function () {
	const rawXml = await getAvailableDriverData();
	const parsedResult = await transform(rawXml, [
		'ListBucketResult/Contents', {
			key: 'string(Key)'
		}]);

	return parsedResult.map(entry => entry.key)
		.map(entry => entry.slice(0, entry.indexOf('/')));
};

const getAvailableDriverData = async function () {
	return new Promise((resolve, reject) => {
		https.get(CHROME_DRIVER_REPOSITORY, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				resolve(data);
			});

		}).on('error', (err) => {
			reject(err);
		});
	});
};
