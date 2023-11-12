const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', err => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
        console.log(`no output, but written path to a new file.`)
    } else {
        console.log(text);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log("ERROR:", err);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}

async function webCat(URL, out) {
    try {
        let resp = await axios.get(URL);
        handleOutput(resp.data, out);
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if(path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}