Please find below the pre-requisites required to run the code-

1) Access to the internet to make the API calls

2) node.js and npm to install the utility functions
This link -http://howtonode.org/how-to-install-nodejs has a comprehensive list of how to install node on any and all OS types

3) if you have node.js and npm the setup is pretty easy

4) a. Just download the zip and extract it at any folder location
   b. Traverse the the above location on the terminal and type npm install. The package.json should take care of installing all the deoendencies

5) Once setup, all you have to do is run the command node server on the command prompt in the same location as the project

6) Once the server is running, please open up a Chrome Browser(only one with the support for HTML Web Speech API) and access localhost:8081

7) localhost:8081 gives you access to the application front end where to start the applcation you can press the "Play Demo" button to record your speech. 

The way the system is designed is that the Speech to Text engine is ready from the get go and you can directly start testing the application. The application wont give results for gibberish entries(i tried to break it too). Also, please do not choose the Interim results radio button as it is not being used for the application logic anymore. Once you record something you can press the Stop demo button and the application based on what it heard would go to backend to get relevant data. The two fields, name and location would have literal "Dummy values" before the reult is fetched and post result fetching would be filled up. The log text box would return the data each NER picked up and the results can be verified. Currently the most consistent result comes across with alchemy API but I am still running all the four to correlate the data correctly.

Hope you have as much with the application as I had and hope nothing breaks.

Thank you for all your help and guidance this  with this wonderful course and the project as well.