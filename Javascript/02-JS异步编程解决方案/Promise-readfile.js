var fs = require('fs');

function readFile(filePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}


// 调用
readFile('../../Test-resource/Test.txt')
  .then(function(data) {
    console.log(data);
    return readFile('./Promise-readFile.js')
  }, function(error) {
    console.log(error);
  })
  .then(function(data) {
    console.log(data);
  }, function(error) {
    console.log(error);
  })
