// const _ = require('../api/index.js')

// self.onmessage = async (mess) => {
//     console.log(mess.data);
    
//     if (mess.data === 'start') {
//         const res = await _.getFeedPosts(1)
//         console.log(res);
        
//         if (res.data.posts.length) {
//             self.postMessage(res.data.posts)
//         }
//     }
//  }

// close();

// (function () {
//     "use strict";
 
//     self.importScripts("../api/index.js");
 
//     // function run() {
//     //     if (!Helpers.networkAvailable()) {
//     //         self.postMessage("The network is not available.");
//     //     }
//     //     else {
//     //         Algorithem.run().then(function (result) {
//     //             self.postMessage(result);
//     //         });
//     //     }
//     // }
 
//     // run();
// }());

// onmessage = (event) ->
//   importScripts('//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js')
//   result = self.hljs.highlightAuto(event.data)
//   postMessage(result.value)

// output: {
//     path: path.join(__dirname, 'dist'),
//     filename: 'bundle.js'
//     publicPath: 'http://localhost:3000',
//     globalObject: 'this'
//    },