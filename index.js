const inquirer = require('inquirer')
const fs = require('fs')

inquirer .prompt([
    {name: 'title', message: "What is your project's title?",},
    {name: 'description', message: "Please enter your project's desription (Leave blank to exclude this section)"},
    {name: 'installInst', message: 'How is your project installed? (Leave blank to exclude this section)'},
    {name: 'usageInst', message: 'How is your project used? (Leave blank to exclude this section)'},
    {name: 'contributionGuides', message: 'Please enter your contribution guidelines:  (Leave blank to exclude this section)'},
    {name: 'tests', message: 'Please enter any test instructions for your project:  (Leave blank to exclude this section)'},
    {name: 'projectLicense', message: 'What license does your project use?  (Leave blank to exclude this section)'},
    {name: 'projectQuestions', message: 'How can users reach you to as questions?  (Leave blank to exclude this section)'}
]) .then ((response) => {
    generateReadmeText(response)
})

function generateReadmeText (responseData) {
    const {title, description, installInst, usageInst, contributionGuides, tests, projectLicense, projectQuestions} = responseData
    let readmeTableOfContents = ''
    let generatedReadmeBody = ''
    if (description != '') {
        generatedReadmeBody += `\n\n##Description\n${description}`
        readmeTableOfContents += '\n- [Description](#description)'
    }
    if (installInst != '') {
        generatedReadmeBody += `\n\n##Install\n${installInst}`
        readmeTableOfContents += '\n- [Install](#install)'
    }
    if (usageInst != '') {
        generatedReadmeBody += `\n\n##Usage\n${usageInst}`
        readmeTableOfContents += '\n- [Usage](#usage)'
    }
    if (contributionGuides != '') {
        generatedReadmeBody += `\n\n##Contribution\n${contributionGuides}`
        readmeTableOfContents += '\n- [Contribution](#contribution)'
    }
    if (tests != '') {
        generatedReadmeBody += `\n\n##Tests\n${tests}`
        readmeTableOfContents += '\n- [Tests](#tests)'
    }
    if (projectLicense != '') {
        generatedReadmeBody += `\n\n##License\n${projectLicense}`
        readmeTableOfContents += '\n- [License](#license)'
    }
    if (projectQuestions != '') {
        generatedReadmeBody += `\n\n##Questions?\n${projectQuestions}`
        readmeTableOfContents += '\n- [Questions?](#questions?)'
    }
    let generatedReadme = `#${title}\n\n##Table of Contents${readmeTableOfContents}` + generatedReadmeBody

    fs.writeFile('./output/README.md', generatedReadme, err => {
        if (err) {
          console.error(err);
        } else {
            console.log('Readme file created! Check output folder.')
        }
      })
}