## In this video we are going to use JWT to authenticate a user 
# We are going to learn about

## jwt.sign({}, 'secret', {}); - To generate an auth token at the time of login
## jwt.verify(token, 'shhhhh', callback) - To verify an auth token

# If auth token verified successfully we are going to store the auth token as signed http cookie on client side(frontend) and authenticate the user based on that token stored in cookies