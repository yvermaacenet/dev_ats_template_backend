const fs = require("fs");
const { exec } = require("child_process");

exports.db_controller = async (req, res) => {
  const SYSTEM_FOLDER = `./database_backup`;
  const files = fs.readdirSync(SYSTEM_FOLDER).filter((file) => file);
  const x = files.map((val) => {
    return {
      name: val,
      created: fs.statSync(`${SYSTEM_FOLDER}/${val}`).birthtime,
    };
  });
  const y = x.sort((a, b) => a.created - b.created);
  const rr = new Date().toISOString();
  const ff = rr.split("T")[0];
  const command = `mongodump -d ${process.env.DATABASE_NAME} -o ${SYSTEM_FOLDER}/${ff}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Errors: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`result: ${stderr}`);
      return;
    }
    // console.log(`Database download complete.`);
  });
  if (y.length >= 10) {
    const oldestFile = y[0].name;
    fs.rmdir(`${SYSTEM_FOLDER}/${oldestFile}`, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Folder ${oldestFile} has been deleted successfully.`);
      }
    });
  }
};
// function downloadDatabase(dbName, collectionName, downloadTime) {
//   mongoose.connect('mongodb://localhost/' + dbName, { useNewUrlParser: true });

//   const currentDate = new Date();
//   const timeDifference = downloadTime - currentDate.getTime();
//   if (timeDifference < 0) {
//      timeDifference += 24 * 60 * 60 * 1000;
//   }

//   setTimeout(() => {
//      const fs = require('fs');

//      const collectionData = mongoose.model(collectionName);
//      collectionData.find().lean().exec(function(err, data) {
//         if (err) {
//            console.log(err);
//         } else {
//            fs.writeFile(collectionName + '.json', JSON.stringify(data), function(err) {
//               if (err) {
//                  console.log(err);
//               } else {
//                  console.log('Database downloaded successfully!');
//               }
//            });
//         }
//      });
//   }, timeDifference);
// }
