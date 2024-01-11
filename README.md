# Delliv

![Delliv](https://i.imgur.com/yJcP7NS.jpg)
v1.0.0



## INDICE 

- <a href="#funcionalidades">Funcionalidades do projeto</a>

- <a href="#tecnologias">Tecnologias</a>

- <a href="#rodar">Como rodar este projeto?</a>


## Funcionalidades

- [x] Cadastro de usuarios
- [x] Autenticação de usuario
- [x] Cadastro e listagem de produtos
- [x] realizar pedido

## Tecnologias 
 
1. [NodeJs](https://nodejs.org/en)
2. [NestJS](https://nestjs.com/)
3. [TypeScript](https://www.typescriptlang.org/)
4. [PrismaORM](https://www.prisma.io/)
5. [JWT (JSON Web Tokens)](https://jwt.io/)
6. [Jest](https://jestjs.io/pt-BR/)
7. [Docker](https://www.docker.com)


## Rodar

### Configurações iniciais

## Instalando dependencias do projeto



### O projeto está utilizando o package manager 'npm' para lidar com os pacotes no node, sendo assim, para baixar as dependencias do projeto basta rodar o comando:



- `npm run install:all` na raiz do projeto, esse comando ira instalar as depencendias do frontend e do backend,

- caso queira instalar separadamente pode tambem rodar o comando: `npm run install:frontend`  ou `npm run install:backend` .

## Configurando variáveis de ambiente

na pasta do backend copie o arquivo .env.example e renomeie para .env. Este arquivo contém as variáveis de ambiente necessárias para o projeto. Preencha as informações de acordo com a sua configuração.

Exemplo do conteúdo de .env.example:



## Database
DATABASE_URL='postgresql://postgres:docker@localhost:5432/delliv?schema=public'

#

## Encryption
JWT_SECRET = 'secret'
#


### Rodar projeto em um container Docker

Para rodar o projeto em um container docker, basta rodar o comando: `docker-compose up` na raiz do projeto, esse comando ira criar um container com o banco de dados postgres e rodar o projeto em outro container.


### Gerando esquema do Prisma e criando estrutura no banco

Entre na pasta ./backend para gerar o esquema do Prisma assim como a estrutura no banco de dados, basta rodar o comando:

`npx prisma db push`


Podes também rodar somente o comando `npx prisma generate` para gerar o esquema do prisma.

### Rodando o seeder para teste/desenvolvimento

Com o prisma eu criei alguns seeders para que o banco de dados ja venha com alguns produtos, usuarios e pedidos cadastrados, para rodar o seeder basta rodar o comando:

`npx prisma db seed`

## Rodando o projeto

Para rodar o projeto utilize o script `npm run start:dev` dentro da pasta ./backend, o frontend ja estara rodando na porta 3000 ( http://localhost:3000 )

---

#LOGIN
 
admin: admin@delliv.com : 123456
usuario: usuario@delliv.com : 123456

## Testes com jest

- Para executar os testes separadamente pode entrar na raiz de cada stack e executar o comando npm test 

 

