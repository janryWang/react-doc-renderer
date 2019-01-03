

# react-doc-renderer

# Usage

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import ReactDocRenderer from 'react-doc-renderer'

const docs = [
  { path: 'a/b/c.md', component: () => <div>Document 1</div> },
  { path: './readme.md', component: () => <div>README.md</div> }
]
ReactDOM.render(<ReactDocRenderer docs={docs} />, mountNode)
```

<!-- BLOCK_START : COMPONENT_PROPS :  ./src/index.js -->
<table class=" PropsTable"><thead><tr><th class="PropsTable--property">Property</th><th class="PropsTable--type">Type</th><th class="PropsTable--required">Required</th><th class="PropsTable--default">Default</th><th width="40%" class="PropsTable--description">Description</th></tr></thead><tbody><tr><td>docs</td><td>Array</td><td>true</td><td><em>-</em></td><td>This is document collection.</td></tr></tbody></table>
<!-- BLOCK_END -->



```
npm install --save react-doc-renderer
```

# LICENSE

The MIT License (MIT)

Copyright (c) 2018 JanryWang

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
