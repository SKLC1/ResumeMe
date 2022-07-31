import fs from 'fs'
import util from 'util'
function generateData(){
  const jsonData = JSON.parse(fs.readFileSync('data.json'));
  const data = JSON.parse(JSON.stringify(jsonData))
  
  console.log(util.inspect(data, {showHidden: false, depth: null, colors: true}));
}
generateData()