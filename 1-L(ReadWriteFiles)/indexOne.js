const fs = require(`fs`).promises;
const path = require(`path`);

const fileOps = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "files2", `one.txt`),
      `utf8`
    );
    await fs.unlink(
        path.join(__dirname, "files2", `one.txt`),
        `utf8`
      );
    console.log(data);
    await fs.writeFile(path.join(__dirname, "files2", `two.txt`), data);
    await fs.appendFile(
      path.join(__dirname, "files2", `two.txt`),
      `\n\n YES Append Node WriteFile`,
      (err) => {
        if (err) throw err;
        console.log(`Append completed`);
      }
    );
    await fs.rename(
      path.join(__dirname, "files2", `two.txt`),
      path.join(__dirname, "files2", `updatedTwo.txt`),
      (err) => {
        if (err) throw err;
        console.log(`rename completed`);
      }
    );
    const newData =await fs.readFile(path.join(__dirname,`files2`,`updatedTwo.txt`),`utf8`)
      console.log(newData);
} catch (error) {
    console.log(error);
  }
};
fileOps();
