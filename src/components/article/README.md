### What is this?
[TW Reporter Article Page React Components Package](https://www.npmjs.com/package/twreporter-react-article-components)

### Why do we this?
This is built for [Editorial Tool](https://github.com/twreporter/keystone) (you can build the editorial tool using [Plate](https://github.com/twreporter/plate)).
In our editorial tool, We hope to make our Editor tool **WYSIWYG**.
Hence, these Article React Components will be used on Article Page and Editorial Tool.

### How to build this?
```
  // build the js and css
  // js and css will be built in ./lib/ 
  npm run build
  npm login
  // upgrade version
  npm version patch
  npm publish
```
### How to install this?
```
  npm i react-article-components --save
```

### How to use this?
```
// es5
var Components = require('react-article-components/lib/main');

// es6
import * as Components from 'react-article-components/lib/main'

// a piece of code in React Component render function
  return (
    <Components.Introduction
      data={introData}
    />
  )

```
