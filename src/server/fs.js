const fs = require('fs')

const name = 'solari-stats.json'

let currentData = {
  production: {
    assetsSize: [],
    time: []
  },

  development: {
    assetsSize: [],
    time: []
  }
}

function initReporter (cb) {
  fs.readFile(name, 'utf8',(err, data) => {
    if (err){
      writeReport(JSON.stringify(currentData), (err, data) => cb(err, data))
    } else {
      // validate the file schema
      if(
        currentData.production
        && currentData.production['assetsSize'].length
        && currentData.production['time'].length
        && currentData.development
        && currentData.development['assetsSize'].length
        && currentData.development['time'].length
      ) {
        currentData = JSON.parse(data);
        cb(null, currentData)
      } else {
        writeReport(JSON.stringify(currentData), (err, data) => cb(err, data))
      }
      
  }});
}

function writeReport (report, cb){
  console.log('writing report')
  fs.writeFile(name, report, 'utf8', (err) => {
    if (err) {
      cb(err, null)
      return process.exit(1)
    } else {
      cb(null, currentData)
    }
  });
}

exports.writeReport = writeReport;
exports.initReporter = initReporter;
exports.getReport = () => currentData;