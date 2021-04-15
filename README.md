# chromedriverdl

Downloads the version of [ChromeDriver](https://chromedriver.chromium.org/) matching the local Chrome installation.

## Download
Using npm:
```shell
$ npm i -g chromedriverdl
```

## Usage
Simply call `chromedriverdl` and a ChromeDriver will be downloaded to the current working directory.

```shell
λ chromedriverdl
Installed Chrome has version 88.0.4324.150
Downloading ChromeDriver 88.0.4324.96 for linux64...
```

### Options
| Option        | Alias | Description                  | Mandatory |
|---------------|-------|------------------------------|-----------|
| --destination | -d    | Path of the output directory | No        |
