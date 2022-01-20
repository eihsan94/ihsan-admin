gf# Serverless NEXT AUTH

This is a boilerplate when making a service using serverless framework aws and login feature with next auth

## Technology stack

```
 next js
 serverless framework
 dynamodb
 aws lambda
 aws api gateway
```

## setting up

1. run

```
$ yarn dev
```

2. SEED - REMEBER WHEN MIGRATING IF WE USE DIFFERENT GOOGLE CLIENT WE NEED TO REGISTER THE USER DIFFERENTLY BECAUSE THE CLIENTID IS DIFFERENT THEREFORE THE ACCESSTOKEN IS DIFFERENT
<Pre>
   - go to `packages/serverless/src/modules/db/seed/user.json` and delete all the data and just leave empty array
   - run 
   - ```
      $ yarn setup
      ```
   - go to http://localhost:3000
   - login with admin user
   - go to auth middleware and refer to the log
   - copy paste the user and account data inside packages/serverless/src/modules/db/seed/user.json
   - refer to the admin role pk in `packages/serverless/src/modules/db/seed/mainTable.json` and put it inside user.json on the type USER data
    
</Pre>

3. change packages/frontend/env.dev to packages/frontend/.env
4. set the
   - GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET by making oauth2 credentials [here](https://console.cloud.google.com/apis/credentials?project=rakuchien-admin)

## DEPLOY

https://hurricane-elk-0d4.notion.site/rakuchien-admin-965c6add76484f7eb36bfe13a417ad53


# env
1. dynamodb http://localhost:8000/shell/
2. command for delete table
   <pre>
   var params = {
      TableName: 'table_name',
   };
   dynamodb.deleteTable(params, function(err, data) {
      if (err) ppJson(err); // an error occurred
      else ppJson(data); // successful response
   });
   </pre>
3. the site itself 
   http://localhost:3000