# campus-online

[![Build Status][travis-badge]][travis-url] [![online][www-badge]][www-url] [![cms][cms-badge]][cms-url] [![enrollment][enrollment-badge]][enrollment-url] [![figma][figma-badge]][figma-url]

> website for fac-unb news lab

## Development Guide
```bash
# install project dependencies
$ yarn

# development server
$ yarn dev # starts dev server

# build static site
$ yarn build # outputs to ./public directory
```



## Tech Stack
> This project started as a fork of [gatsby-starter-netlify-cms](https://github.com/fac-unb/campus-online/blob/master/github.com/AustinGreen/gatsby-starter-netlify-cms)

#### Front-End Packages

| name | license | description |
|:-----|:-------:|:------------|
| [`react`](https://reactjs.org/) | [`MIT`](https://api.github.com/repos/facebook/react/license) | declarative, component-based, functional approach to user interfaces |
| [`gatsby`](https://www.gatsbyjs.org/) | [`MIT`](https://github.com/gatsbyjs/gatsby/blob/master/LICENSE) | blazing fast static site generator for `react` |
| [`recompose`](https://github.com/acdlite/recompose) | [`MIT`](https://github.com/acdlite/recompose/blob/master/LICENSE.md) | a `react` utility belt for function components and `higher-order components`. |
| [`styled-components`](https://styled-components.com/) | [`MIT`](https://api.github.com/repos/:owner/:repo/license) | `css-in-js` library, composable styling |
| [`netlify-cms`](https://www.netlifycms.org/docs/widgets/) | [`MIT`](https://github.com/netlify/netlify-cms/blob/master/LICENSE) | open source content management for your `git` workflow |


#### System Dependencies
| name   | min. version |
|:-------|-------------:|
| `bash` |      `3.0.0` |
| `node` |      `8.0.0` |
| `yarn` |      `1.0.0` |


---

##### Support

[kunst](https://kunst.com.br)

[travis-badge]: https://travis-ci.com/fac-unb/campus-online.svg?branch=master
[travis-url]: https://travis-ci.com/fac-unb/campus-online
[www-badge]: https://img.shields.io/badge/netlify-online-brightgreen.svg
[www-url]: https://campus.kunst.cloud/
[cms-badge]: https://img.shields.io/badge/❖-cms-00C7B7.svg?colorA=00C7B7
[cms-url]: https://campus.kunst.cloud/admin/
[enrollment-badge]: https://img.shields.io/badge/≡-enrollment-0067EE.svg?colorA=0067EE
[enrollment-url]: https://matricula.campus.kunst.cloud/
[figma-badge]: https://img.shields.io/badge/Ω-figma-444648.svg?colorA=242628
[figma-url]: https://www.figma.com/file/M7qolUHcVVZiqcYh4XmsvV
