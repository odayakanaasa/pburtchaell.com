# pburtchaell.com [![Build Status](https://travis-ci.org/pburtchaell/pburtchaell.com.svg?branch=master)](https://travis-ci.org/pburtchaell/pburtchaell.com)

## Overview

My website is generated by [Assemble](http://assemble.io), a static website generator for node.js. At the moment, the Assemble core team is working toward publishing gulp-assemble, thus Grunt is only used to generate the HTML. 

Gulp is used to compile all JavaScript and stylesheets. In addition, gulp both provides a local webserver for development and handles deploying generated files to a bucket on Amazon Web Services S3, which is where the files are hosted.

## Getting Started

1. Install development tools: `npm install -g gulp grunt-cli bower`
2. Instal dependencies: `npm install`
3. Build the HTML: `grunt assemble`
4. Everything else: `gulp`

---
Built with care in New Orleans | Source [licensed MIT](LICENSE)

All content [copyright 2014 Patrick Burtchaell](LICENSE)
