# Projeto Blogs Api

# Contexto

Projeto back-end usando ORM com o pacote sequelize com o objetivo de criar e associar tabelas e
construir endpoints para realização de um CRUD com ORM.

## Técnologias usadas

Back-end:

> Desenvolvido usando: Node, Sequelize e JavaScript e JWT.
> Deploy utilizando Heroku, Heroku-Postegres e Docker.

## Para testar a aplicação

- Você pode acessar a url https://www.postman.com/.
- Crie uma conta gratuita clicando em sign up for free do lado direito superior.
- Neste link você encontra a documentação de como utilizar o postman.

## Link da aplicação

- https://blog-api-0001.herokuapp.com/

## Endpoints

- POST /user, o endpoint retorna um token JWT, o corpo da requisição deverá ter o seguinte formato:
  {
  "displayName": "Brett Wiltshire",
  "email": "brett@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }

- POST /login, o endpoint retorna um token JWT, o corpo da requisição deverá ter o seguinte formato:
  {
  "email": "email@mail.com",
  "password": "123456"
  }

- GET /user, lista todos os usuários, a requisição deve ter um token de autenticação nos headers.
- GET /user/:id, retorna os detalhes do usuário baseado no id, a requisição deve ter um token de autenticação nos headers.
- POST /categories, cria uma nova categoria, a requisição deve ter um token de autenticação nos headers,
  o corpo da requisição deverá ter o seguinte formato:
  {
  "name": "Inovação"
  }

- GET /categories, lista todas as categorias, a requisição deve ter um token de autenticação nos headers.
- POST /post, o endpoint deve receber um BlogPost no corpo da requisição e criala no banco,
  a requisição deve ter um token de autenticação nos headers, o corpo da requisição deverá ter o seguinte formato:
  {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2]
  }

- GET /post, lista todos os BlogPosts, a requisição deve ter um token de autenticação nos headers.
- GET post/:id, retorna um BlogPost baseado no id especificado, a requisição deve ter um token de autenticação nos headers.
- PUT /post/:id, sobrescreve o BlogPost original baseado no id recebido na url,
  a requisição deve ter um token de autenticação nos headers, o corpo da requisição deverá ter o seguinte formato:
  {
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
  }

- DELETE post/:id, deleta o post com o id especificado na url, a requisição deve ter um token de autenticação nos headers.
- DELETE /user/me, utilizando o token de autenticação nos headers, o usuário correspondente é apagado,
  a requisição deve ter um token de autenticação nos headers.
- GET post/search?q=:searchTerm, retorna os BlogPosts que contenham em seu título, ou conteúdo,
  o termo pesquisado no queryParam da url, a requisição deve ter um token de autenticação nos headers.
