# Node server with JWT authentication

## Testing RESTFul API

- User registration:  
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Wolverine", "email": "wolverine@example.com", "password": "123456789"}' http://localhost:3000/api/v1/register

- User login:  
curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "Wolverine", "email": "wolverine@example.com", "password": "123456789"}' http://localhost:3000/api/v1/login

- Create article:  
curl -i -X POST -H 'Content-Type: application/json' -d '{"title": "Wolverine", "content": "Wolverine is X-Man", "user_id": 1}' http://localhost:3000/api/v1/create-article

- Update article:  
curl -i -X PUT -H 'Content-Type: application/json' -d '{"title": "Wolverine Updates", "content": "Wolverine is X-Man is updated", "id": 1}' http://localhost:3000/api/v1/update-article

- Delete article:  
curl -i -X DELETE http://localhost:3000/api/v1/delete-article/1

- List all articles:  
curl -i -X GET http://localhost:3000/api/v1/list-articles

- Read one article:  
curl -i -X GET http://localhost:3000/api/v1/read-article/1

- Find articles by user name(user_id) in articles table:  
curl -i -X GET http://localhost:3000/api/v1/find-articles/1

Of course you can change the values as you wish to.