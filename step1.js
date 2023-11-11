const cat = require('fs');

cat.readFile('one.txt', 'utf8', (err, path) => {
    if(err) {
        console.log("ERROR:", err);
        process.kill(1);
    }
    console.log(path);
});