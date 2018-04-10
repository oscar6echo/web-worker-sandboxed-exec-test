# Web Worker Sandboxed JS Exec - Test

## 1 - Overview

To `eval()` strings into javascript functions and call them from main process.  
Possible but function is only accessible through [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).  

## 1 - Install and Run

From terminal:

```bash
$ git clone https://github.com/oscar6echo/web-worker-sandboxed-exec-test.git

$ cd web-worker-sandboxed-exec-test

# install live-server if npm, else some othe web server
$ npm install -g live-server

$ . run.sh

# open browser to http://127.0.0.1:8081/
# open console
```

## 3 - Security in Web Workers

[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are not completely isolated.  
But can be made so as described in this [page](https://www.softfluent.com/blog/dev/Executing-untrusted-JavaScript-code-in-a-browser).  
Though how to configure CSP in the context of a Jupyter ipywidget is not clear.  
