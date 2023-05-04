const fs = require("fs");
const { exec } = require("child_process");

exports.db_backup = async (req, res) => {
  try {
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
    const command = `mongodump -d ${process.env.DATABASE_NAME} -o ${SYSTEM_FOLDER}/19`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Errors: ${error.message}`);
        return;
      }
      if (stdout) {
        console.log(`stdout:`, stdout);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(`Database download complete.`);
    });
    if (y.length > 10) {
      const oldestFile = y[0].name;
      fs.rmdir(`${SYSTEM_FOLDER}/${oldestFile}`, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Folder ${oldestFile} has been deleted successfully.`);
        }
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
