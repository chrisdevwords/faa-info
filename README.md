Alexa Airport Info 
==================
Based on the [Developing Alexa Skills Locally](https://www.bignerdranch.com/blog/tags/alexa-skills-kit/) tutorial:
* Step 1: [Developing Alexa Skills Locally with Node.js: Setting Up Your Local Environment](https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-setting-up-your-local-environment/)
* Step 2: [Developing Alexa Skills Locally with Node.js: Implementing an Intent with Alexa-app and Alexa-app-server](https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-implementing-an-intent-with-alexa-app-and-alexa-app-server/)
* Step 3: [Developing Alexa Skills Locally with Node.js: Deploying Your Skill to Staging](https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-deploying-your-skill-to-staging/)

With a few differences:
* Uses Node v4.3.2 for more [ES6 Sexiness](http://node.green/).
* [No Lo-Dash](https://www.reindex.io/blog/you-might-not-need-underscore/)
* Includes a build command to zip files for upload.

Requirements
------------
* Requires Node v4.3.2 
* Package engine is set to strict to match [AWS Lambda Environment](https://aws.amazon.com/blogs/compute/node-js-4-3-2-runtime-now-available-on-lambda/)
* I recommend using [NVM](https://github.com/creationix/nvm)

Compiling For Upload
--------------------
You can zip up the relevant files for upload by running:
````
$ npm build
````
This should output a zip file for upload to the AWS Lambda Console.

Running Tests
-------------
This project includes [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) w/ [Chai-as-promised](https://www.npmjs.com/package/chai-as-promised) for testing service data parsing. If you add to this, write more tests. And run them:
````
$ npm test
````

Running Locally
---------------
As far as I know, you can't connect to an Alexa Device locally, but there is a way to [run a development server with a test harness](https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-implementing-an-intent-with-alexa-app-and-alexa-app-server/) using [Alexa App Server](https://github.com/matt-kruse/alexa-app-server).

In another directory:
````
$ git clone https://github.com/matt-kruse/alexa-app-server
$ cd alexa-app-server && npm i
$ npm start
````
To test this repo locally, sim link this project inside the examples/apps directory of Alexa App Server. Assuming you've cloned this repo to a directory: ~/Projects, in the alexa-app-server directory:
````
$ ln -s ~/Projects/faa-info ./examples/apps/
````
You may want to add this sim link to your copy of that project's .gitignore. 
