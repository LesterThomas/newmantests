const newman = require('newman'); // require newman in your project
// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: process.argv[2] 
}, function (err) {
    if (err) {
        process.exitCode = 1;
        console.log(JSON.stringify({error:{message: err.message}}))
    }
}).on('done', function (err, summary) {
    console.log(JSON.stringify({name: summary.collection.name, stats: summary.run.stats, timings: summary.run.timings}));  
    if (summary.run.failures.length>0) {
        process.exitCode = 1;
        console.error(JSON.stringify({failures: summary.run.failures}));  
    }
});