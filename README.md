# nodejs_api
user CRUD api with authentication using nodejs

## Setup
1) clone this repo*  
2) change directory to the cloned repo  
3) run npm install**  
4) edit config.js***  
5) run index.js  
  
* git checkout feat_jwt to access repo with authentication  

** if you run into problems installing bcrypt this commands may aid you:  
npm install -g windows-build-tools  
npm install --global --production windows-build-tools  
npm install --global --production windows-build-tools --vs2015  
npm config set msvs_version 2017  
<b>NOTE:</b> you may need to run all or just some of the commands, this are compiled solutions to the errors
  
*** place gmail username and password that will be used for emailing service, allow gmail account to access less secure apps  

## Routes (all routes with '*' needs a authoriazation token to access)
#### post auth/signup  
{  
	"email": "<string>",  
	"password": "<string>",  
  "password_confirmation": "<string>",  
  "first_name": "<string>",  
  "last_name": "<string>",  
  "sex": "number",  
  "civil_status": "<string/prefered a single char>",  
  "address": "<string>",  
  "nationality": "<string>",  
}  
#### get auth/signup/activate/:token  
#### post auth/login  
{  
	"email": "<string>",  
	"password": "<string>",  
}  
post auth/changepass/:userId '*'  
{  
	"password": "<string>",  
	"new_password": "<string>",  
	"new_password_confirmation": "<string>"  
}  
  
#### get users/ '*'  
#### post users/ '*'  
{  
	"email": "<string>",   
  "first_name": "<string>",  
  "last_name": "<string>",  
  "sex": "<number>",  
  "civil_status": "<string/prefered a single char>",  
  "address": "<string>",  
  "nationality": "<string>"    
}  
* this created user has default password, is not active and an email activation token is not sent, user created this way needs its active field be updated via PATCH request  
#### get users/:userId '*'  
#### patch users/:userId '*'  
{     
  "first_name": "<string>",  
  "last_name": "<string>",  
  "sex": "<number>",  
  "civil_status": "<string/prefered a single char>",  
  "address": "<string>",  
  "nationality": "<string>",  
  "active": "<boolean>"
} 
* this patch request doesn't need all fields to be placed, only the mentioned fields will be updated, everything else remains as is  
#### delete users/:userId '*'  
