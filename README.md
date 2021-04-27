# Keycloak with Node js and Ejs

**Prerequisites:**

1. Docker
2. Node Js ^14
3. NPM ^6

**Reference link to install Prerequisites:**

1. Docker: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
2. Node Js and NPM: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

**Setting up docker with Keycloak image:**

  1. Open terminal and past the following command to create a container with username &quot;admin&quot; and password &quot;password&quot; with database as &quot;H2&quot;.
        ![](RackMultipart20210427-4-tg52gb_html_68c5e3091170b437.gif)

     ``` 
     docker run -e DB_VENDOR=H2 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=password -p 8080:8080 --name keycloak -dit jboss/keycloak

     ```

  2. Once the setup is completed you can access the Keycloak server from browser with this URL: [http://localhost:8080/auth/](http://localhost:8080/auth/)

**Setting up Keycloak Server:**

   1. Click on the Administrative console:

      ![image](https://user-images.githubusercontent.com/49073723/116204070-0227f380-a75a-11eb-935c-c3068ca17e66.png)

   2. Put the same username and password which we used to create a Keycloak container in docker which is username &quot;admin&quot; and password &quot;password&quot;.

      ![image](https://user-images.githubusercontent.com/49073723/116204099-08b66b00-a75a-11eb-91fb-8a98f9191673.png)

   3. Now we have to create a realm for our project. Click on drop down called &quot;Master&quot; and click on add realm.

      ![image](https://user-images.githubusercontent.com/49073723/116204122-0e13b580-a75a-11eb-9773-0f51cf828251.png)

   4. Now give the name for the realm like &quot;Nodejs&quot; and click on create.

      ![image](https://user-images.githubusercontent.com/49073723/116204151-14a22d00-a75a-11eb-9e6e-ebe2bb342063.png)

   5. Now click on clients in the left menu bar from the Nodejs realm like below

      ![image](https://user-images.githubusercontent.com/49073723/116204296-461af880-a75a-11eb-8d37-647dacfe120f.png)

   6. Click on Create button.

      ![image](https://user-images.githubusercontent.com/49073723/116204312-4a471600-a75a-11eb-8b2a-dc19ae0d2bb5.png)

   7. Now add the client ID as &quot;backend&quot;, client Protocol to &quot;open-connect&quot; and root URL of Node Js server which is &quot; [http://localhost:3000/]                 (http://localhost:3000/) &quot; and click on save.

      ![image](https://user-images.githubusercontent.com/49073723/116204342-50d58d80-a75a-11eb-9e5e-1522f8ab752e.png)

   8. Now change the access type to confidential and click on save.

      ![image](https://user-images.githubusercontent.com/49073723/116204357-5501ab00-a75a-11eb-9bb6-3e6542aad75d.png)

   9. Now go to the Installation and select the format option as &quot;Keycloak OIDC JSON&quot; and copy the entire Json details and save it some where because it is used in           configuring the Node JS server in upcome steps.

      ![image](https://user-images.githubusercontent.com/49073723/116204382-592dc880-a75a-11eb-96b9-8e62451c3d8c.png)

   10. Now we have to create users for the realm. Click on users in the menu:

       ![image](https://user-images.githubusercontent.com/49073723/116204404-5df27c80-a75a-11eb-8571-bb97ab8ce0a1.png)

   11. Click on add users:

       ![image](https://user-images.githubusercontent.com/49073723/116204422-62b73080-a75a-11eb-8354-009dab61e56f.png)

   12. Add the username as &quot;demo&quot; and click on save. You can add other details if needed but for demo purpose we are just creating a user named &quot;demo&quot;.

       ![image](https://user-images.githubusercontent.com/49073723/116204439-66e34e00-a75a-11eb-940e-65893eaf2ead.png)

   13. Now click on Credentials and set the password as &quot;password&quot; and toggle the Temporary to off. And click on set password. It will prompt an alert, just click on          set password again.
   
       ![image](https://user-images.githubusercontent.com/49073723/116204449-6ba80200-a75a-11eb-8851-ce219acbd629.png)

Now the user is been created Successfully.

**Setting up Node Js server**

  1. Clone the repository from this link: [https://github.com/Sujithk007/Keycloak-with-Node-js-and-Ejs](https://github.com/Sujithk007/Keycloak-with-Node-js-and-Ejs)
  2. Or you can download the zip file and extract it in your local PC.
  3. Inside the folder Keycloak-with-Node-js-and-Ejs, open Keycloak.json in any editor.
  4. Now we have to configure the Node js server with Keycloak. To do so, we need the configuration for the client which we configured in Keycloak server.
  5. From **Step 9** of **Setting up Keycloak Server** above we have the configurations.
  6. Past that entire configuration in the Keycloak.json and save it.

     ![image](https://user-images.githubusercontent.com/49073723/116204470-706cb600-a75a-11eb-98bf-7beb3b50ac74.png)

**Starting Node Js Server:**

  1. Inside the cloned folder start the terminal.
  2. Execute the following command one by one:
     ```
     npm install
     npm start
     ```

  3. Like below:
  
     ![image](https://user-images.githubusercontent.com/49073723/116204510-782c5a80-a75a-11eb-8170-08076337dd08.png)

  4. Open browser at this URL: [http://localhost:3000/](http://localhost:3000/) and click on login which will redirect to Keycloak login page.

     ![image](https://user-images.githubusercontent.com/49073723/116204613-942ffc00-a75a-11eb-98c0-f493ea26db7e.png)

  5. Enter the username &quot;demo&quot; and password &quot;password&quot; of the user which we created.
     
     ![image](https://user-images.githubusercontent.com/49073723/116204631-97c38300-a75a-11eb-8b80-731dd0339fa1.png)

  6. Once you are signed in you will be redirected to the protected page like this:

     ![image](https://user-images.githubusercontent.com/49073723/116204658-9c883700-a75a-11eb-8dd8-e077b0b90ec3.png)

  7. Once we click on logout it will redirect to unprotected page and session will be destroyed like below:

     ![image](https://user-images.githubusercontent.com/49073723/116204682-a0b45480-a75a-11eb-8a7f-5b80d3382d1a.png)

Note: This code is not capable for production because there is data leak in the session memory store for this, we have to configure the Redis or MongoDB to manage the session. That can be done by adding the configurations to this code by referring the stack overflow: [https://stackoverflow.com/questions/10760620/using-memorystore-in-production](https://stackoverflow.com/questions/10760620/using-memorystore-in-production)
