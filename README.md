# SkyFlow Backend

## About This Service
This is a simple Node.js backend application that ingests flight data from TravelPayouts API and allows users to retrieve that data.
You can view the corresponding frontend application here: https://github.com/netia1128/sky_flow_be
This service was created as a short but sweet example of my coding style. 

## Run Locally
If you desire to boot this app up on your local server, please follow these steps.

Note - these instructions assume that you already have:
- A current version of node installed
- A current version of postgres installed
- That you use the VS Code IDE and know how to use its built in debugger
If you do not have these building blocks in place, please download these resources before continuing.

Step 1: Clone the repository into a directory of your choosing.
Step 2: Send me a message and ask me to share my ENV file contents with you.
Step 3: Decode the env contents provided: `$ echo <encoded_content> | base64 -d`
Step 3: CD into the root folder of the repository and add your .env file (paste the decodec content into it) `$ touch .env`
Step 4: Create the database. 
- Log into a PSQL shell via your terminal: `$ psql -d postgres`
- Create the database `$ CREATE DATABASE skyflow_db;`
- Optional: Create a new user for this database 
   without a password `$ CREATE USER <your_desired_username>;`
   OR
   with a password `$ CREATE USER <your_desired_username> WITH ENCRYPTED PASSWORD <your_desired_password>;`
- Grant privleges to your new (or existing) user for the new database: `$ GRANT ALL PRIVILEGES ON DATABASE skyflow_db TO <your_user_name>;`
- Get out of the PSQL shell `$ \q`
Step 5: Update the POSTGRES_USER, POSTGRES_PASSWORD, and DATABASE_URL in .env file as needed
Step 6: Install the node modules `$ npm i`
Step 7: Run migrations against database `$ npm run migrate up`
Step 8: From the VS Code debugger tab, select "Launch App"
Step 9: You should be up and running. Please review the projects swagger docs to learn how to interact with the app. 

## To Do List
- Finish writing tests
- Complete swagger
- Add architecture/sequence diagrams to README