<p align="center" style="text-align: center"> Powered by: </p>

<p align="center">
  <span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" style="width: 40px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/2560px-Node.js_logo_2015.svg.png" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</p>

<p align="center">
  
  <span>
  <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" style="width: 100px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>

  <span>
  <img src="https://www.citypng.com/public/uploads/preview/mysql-black-logo-transparent-background-11662225012tkocwlalne.png" style="width: 100px;" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  
  <span>
  <img src="https://miro.medium.com/v2/resize:fit:788/0*Qdg5QbuCGOI7qzsF.png" style="width: 100px; padding-right: 20px;" />&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
</p>

<br />

When you clone this repository, install all dependancies by running ```npm i```.

Then create .env file with necessary content:
```
DATABASE_URL="mysql://your-database-link"

TOKEN_SECRET="this-is-a-secret-value-with-at-least-32-characters"
```

Then you can run app in development mode by running ```npm run dev```

To *build* production Javascript version of app run ```npm run build```. You might need additionally install tsc-alias package to make aliases work during build time, you can read more about it [here](https://www.npmjs.com/package/tsc-alias). Builded files will be in the /dist folder in the project's root.

To run production version run ```npm start```

## Routes

App contains following routes and corresponding methods under baseURL http://localhost:8000:

'/users/' (GET) [PROTECTED] - to get user info. You should sent an "email" param in request

'/users/' (DELETE) [PROTECTED] - to delete user. You should sent an "email" param in request

'/users/update' (UPDATE) [PROTECTED] - to update user info. "email" field is required in request body, other fields are optional.

'/users/register' (POST) - to create user. You should sent "email", "first_name", "last_name", "password" fields in request body.

'/users/login' (POST) - to login user and get an access_token and refresh_token. You should sent "email" and "password" fields in request body.

'/auth/refresh' (POST) - to refresh user jwt. 

'/docs/' (GET) - returns Swagger documentation API page, should be opened in browser. 