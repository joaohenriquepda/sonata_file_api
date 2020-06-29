

# Sonata-File-API

## Ambiente de desenvolvimento 

O ambiente de desenvolvimento consta com suas dependências em containers do Docker. 
Para utilizar o docker para executar o projeto basta executar o comando abaixo na raíz do projeto
```
$ docker-compose up
```
O Docker irá realizar o download de todas as dependências necessárias e ao final do processo o projeto estará disponível para acesso em **https://localhost:3333**

## Depêndencias
- NodeJS >= 10  
- Adonis 4.1
- Postgres 9.6
- Git >= 13



## Comandos úteis

### server local
Caso não queria usar o Docker para gerenciar as dependências do projeto e já tenha sua máquina configurada com Node e o Adonis, poderá usar o comando a seguir para colocar o sistema em funcionamento

```
$ adonis serve --dev
```

Se tudo ocorrer conforme o esperado poderá acessar o projeto em **https://localhost:3333**

### Testes unitários

```
$ npm test
```
## Processo de deploy e CI/CD

 Atualmente o projeto não conta com integração contínua e deploy contínuo integrado, o processo ainda é manual. 

 Uma maneira de tentar garantir a qualidade do código produzido o projeto conta com a configuração de *pre-commit* que roda todos os testes e se caso positivo confirma o commit, esse processo tem como objetivo que o código que será submetido atenda os critérios básicos de qualidade e evite conflitos com código no repositório 

####  Deploy
 O sistema se encontra hospedado em um servidor gratuito da **HEROKU**

 Primeiro precisamos atualizar os arquivos da master, feito isso com o comando a seguir damos início ao processo de deploy o servidor Heroku. Lembrando que o servidor já contém as variáveis de ambiente e caso necessite irá executar os migrates.
<!-- 
 Segue abaixo as instruçõe para realizar o deploy no  servidor **Heroku** 
  -->
 ```
$ git push heroku master
```

O processo vai se iniciar e se caso ocorrer bem em poucos segundos a API já estará pronta para uso


## Pontos de destaque sobre regra de negócios
Algumas das soluções apresentadas aqui foram desenvolvidas pensando na continuidade do desenvolvimento.

- O sistema armazena localmente o token (padrão JWT) de acesso que expira em um determinado período de tempo.
- A API para algumas consultas é necessário passar o token de acesso;


### Pontos de Melhoria

- Validação de erros e retorno de status e mensagens;
- validação de entradas.

## Links de acesso
 
 O projeto está hospedado no firebase e pode ser acessado em 
 
 https://sonata-api-file.herokuapp.com/