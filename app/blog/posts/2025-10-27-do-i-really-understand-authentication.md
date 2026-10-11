# do i really understand authentication?

implementing authentication can be one of the easiest if you know how (like really how?) or one of the hardest if you don't.

in this blog i will be talking about how i have implemented authentication.

so i have majorly implemented authentication in two ways one of which i will talk in this because i fear the another may require a separate blog.

my first implementation of authentication was by hashing passwords and generating jasonwebtokens (jwt for short). it is pretty simple to implement. you need node.js, express, bcrypt , jwt and a dotenv to store your jwt_secret.

i will not go through the code but explain what happens. the implementation first starts with setting up a basic index.js to listen on a port and defining routes and middleware.

note: (routes or controllers consider them same - routes basically route user request to the appropriate controllers with a middleware check if needed)

1. route/register: the register route is used to get the user inside our database. the user provides us with email and password. passwords need to be hashed before storing into the database. this is where 'bcrypt' comes into action. it hashes password with the salt that you define. salt is basically the level to which you want the passwords to be hased. 10 is a good number. after this just commit the results to the database.
2. route/login: here you take the password and compare it with the pass stored in the database by the compare method. if the comparison returns in true, your task is to generate a jwt token. this jwt token is signed with your jwt secret and has an expiry. this token will basically be used everytime the user tries to access any protected route.

the tokens which i am talking about are called the access tokens and are stored in cookies or local storage. generally along with the access token a long lived token is also created called as refresh token. the idea behind this is access tokens being short lived cause users to sign in again and again which is destroys user experience (i would love to propagate this message to elevenlabs team :) ).

so how does refresh tokens come to the rescue? when an access token expires the client sends the refresh token to get a new access token. this is called rotating tokens. now the user needs to login again after the long lived refresh tokens expire.

the idea of refresh token might sound useless right now? like cannot we create a long lived access token in the first place. i encourage you to wonder upon this and try searching the web for the same after you have brainstormed enough :)

also the other method i was talking about is actually not a method but the way we use Supabase's authentication services.
