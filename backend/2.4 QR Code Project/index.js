
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
    message: "Type your URL ",
    name: "URL",
  },
  ])
  .then((answers) => {
    const clickonurl=answers.URL;
    var qr_svg = qr.image(clickonurl);
    qr_svg.pipe(fs.createWriteStream('shahbe.png'));
    fs.writeFile("URL.txt", clickonurl, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });