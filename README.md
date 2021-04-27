# Keycloak-with-Node-js-and-Ejs
Keycloak with Node js and Ejs.

**Keycloak with Node Js and EJS**

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

docker run -e DB\_VENDOR=H2 -e KEYCLOAK\_USER=admin -e KEYCLOAK\_PASSWORD=password -p 8080:8080 --name keycloak -dit jboss/keycloak

1. Once the setup is completed you can access the Keycloak server from browser with this URL: [http://localhost:8080/auth/](http://localhost:8080/auth/)

**Setting up Keycloak Server:**

1. Click on the Administrative console:

![](RackMultipart20210427-4-tg52gb_html_ab3a8214033a7763.png)

1. Put the same username and password which we used to create a Keycloak container in docker which is username &quot;admin&quot; and password &quot;password&quot;.

![](RackMultipart20210427-4-tg52gb_html_b930df5dae33be79.png)

1. Now we have to create a realm for our project. Click on drop down called &quot;Master&quot; and click on add realm.

![](RackMultipart20210427-4-tg52gb_html_f6f75fb71fbfdc7a.png)

1. Now give the name for the realm like &quot;Nodejs&quot; and click on create.

![](RackMultipart20210427-4-tg52gb_html_d735c4a134d8e245.png)

1. Now click on clients in the left menu bar from the Nodejs realm like below

![](RackMultipart20210427-4-tg52gb_html_f6c7b9d919bc3156.png)

1. Click on Create button.

![](RackMultipart20210427-4-tg52gb_html_5397efa4abfec176.png)

1. Now add the client ID as &quot;backend&quot;, client Protocol to &quot;open-connect&quot; and root URL of Node Js server which is &quot; [http://localhost:3000/](http://localhost:3000/) &quot; and click on save.

![](RackMultipart20210427-4-tg52gb_html_703ea5936cec1585.png)

1. Now change the access type to confidential and click on save.

![](RackMultipart20210427-4-tg52gb_html_dd8981d4ce2d2892.png)

1. Now go to the Installation and select the format option as &quot;Keycloak OIDC JSON&quot; and copy the entire Json details and save it some where because it is used in configuring the Node JS server in upcome steps.

![](RackMultipart20210427-4-tg52gb_html_9edfba163909459.png)

1. Now we have to create users for the realm. Click on users in the menu:

![](RackMultipart20210427-4-tg52gb_html_812c08fcb2e6db74.png)

1. Click on add users:

![](RackMultipart20210427-4-tg52gb_html_b6b36514d81eac23.png)

1. Add the username as &quot;demo&quot; and click on save. You can add other details if needed but for demo purpose we are just creating a user named &quot;demo&quot;.

![](RackMultipart20210427-4-tg52gb_html_7d76b869befd141f.png)

1. Now click on Credentials and set the password as &quot;password&quot; and toggle the Temporary to off. And click on set password. It will prompt an alert, just click on set password again.

![](RackMultipart20210427-4-tg52gb_html_2b55c3cfaf5165d8.png)

Now the user is been created Successfully.

**Setting up Node Js server**

1. Clone the repository from this link: [https://github.com/Sujithk007/Keycloak-with-Node-js-and-Ejs](https://github.com/Sujithk007/Keycloak-with-Node-js-and-Ejs)
2. Or you can download the zip file and extract it in your local PC.
3. Inside the folder Keycloak-with-Node-js-and-Ejs, open Keycloak.json in any editor.
4. Now we have to configure the Node js server with Keycloak. To do so, we need the configuration for the client which we configured in Keycloak server.
5. From **Step 9** of **Setting up Keycloak Server** above we have the configurations.
6. Past that entire configuration in the Keycloak.json and save it.

![](RackMultipart20210427-4-tg52gb_html_c4b5ad0c3eb5b977.png)

**Starting Node Js Server:**

1. Inside the cloned folder start the terminal.
2. Execute the following command one by one:
 ![](RackMultipart20210427-4-tg52gb_html_d377df68877295b.gif)

\&gt;\&gt; npm install

\&gt;\&gt; npm start

1. Like below:

![](RackMultipart20210427-4-tg52gb_html_67c17618103dd7fd.png)

1. Open browser at this URL: [http://localhost:3000/](http://localhost:3000/) and click on login which will redirect to Keycloak login page.

![](RackMultipart20210427-4-tg52gb_html_d6769c7aef20d3bf.png)

1. Enter the username &quot;demo&quot; and password &quot;password&quot; of the user which we created.

![](RackMultipart20210427-4-tg52gb_html_4d5ce2153081b288.png)

1. Once you are signed in you will be redirected to the protected page like this:

![](RackMultipart20210427-4-tg52gb_html_17bb302493c8c414.png)

1. Once we click on logout it will redirect to unprotected page and session will be destroyed like below:

![](RackMultipart20210427-4-tg52gb_html_57841d8b435fe476.png)

Note: This code is not capable for production because there is data leak in the session memory store for this, we have to configure the Redis or MongoDB to manage the session. That can be done by adding the configurations to this code by referring the stack overflow: [https://stackoverflow.com/questions/10760620/using-memorystore-in-production](https://stackoverflow.com/questions/10760620/using-memorystore-in-production)
