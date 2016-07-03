simple-config
===============

A simple library that helps you find your configuration file

# Installation


```
npm install -S simple-config
```


# Usage

ugly one-liner.. :)

```
var config = require( require('simple-config').init().configFile )
```

more verbose

```
var simpleConfig = require('simple-config')
simpleConfig.init()
var config = require(simpleConfig.configFile) // in case your configuration file is JSON
```

# Specifying config file on command line

```
node index.js --config my/path/to/config.json
```

Relative paths will be resolve relative to cwd
Absolute paths work too

# Specifying config file with environment variable

```
export CONFIG_FILE=my/path/to/config.json
node index.js
```

Relative paths will be resolve relative to cwd
Absolute paths work too




