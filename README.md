# Eventify

## Sobre o App

O Eventify é um aplicativo que permite seus usuários divulgarem eventos e manifestações culturais, como shows, mostras de cinema, peça de teatro entre outras atividades, permitindo que outros usuários possam encontrar atividades de seu interesse ou explorar novas.

- Cadastrar usuários, considerando os organizadores;
- Realizar login/logout;
- Permitir que os usuários organizadores criem eventos;
- Buscar eventos por localidade e categoria;
- Vizualizar detalhes de um evento;

Para futuras versões, seria permitido comprar um ingresso pelo app, contemplando os seguintes requisitos:

- Escolher um evento e comprar ingressos;

## Protótipos de tela

[Link para o protótipo do aplicativo](https://www.figma.com/design/4vb1z601jlP9PBRHRfRoah/Eventify?node-id=0-1&m=dev&t=N4RWWGNDrIP0DVrZ-1) 

## Modelagem do Banco de Dados

Banco de dados da aplicação. Será usado um banco de dados relacional, como o SQLite/Postgres.

![Eventify Database](eventify-database.png)

## Planejamento das Sprints

- Prototipação das telas
  - [x] Login de usuário;
  - [x] Cadastro de usuário;
  - [x] Feed de evento;
  - [x] Cadastro de evento;
  - [ ] Detalhes de um evento;
  - [ ] Editar evento;
  - [ ] Editar usuário.
- [x] Roteamento da aplicação
- Cadastro e login de usuários - Prazo estimado em 1 semana
  - [ ] Adicionar lógica para cadastrar um usuário;
  - [ ] Adicionar lógica de autenticar um usuário;
  - [ ] Adicionar lógica para autorizar um usuário.
- Permitir que usuário organizador crie e edite um evento - Prazo estimado em 1 semana
  - [ ] Permitir que usuário do tipo organizador acesse a tela de cadastro de evento;
  - [ ] Permitir que um usuário do tipo organizador edite um evento criado por ele.
- Mostrar os eventos cadastrados e mostrar detalhes de um evento - Prazo estimado de 3 dias
  - [x] Tela para eventos cadastrados, utilizando dados fake (mockados);
  - [ ] Tela para mostrar detalhes de um evento;
  - [ ] Rota para detalhes de um evento.

## Atualizações desde o último checkpoint

1. Prototipação de algumas telas;
2. Criado componentes que podem ser reutilizados, como `BackButton`, `EventCard` e `Checkbox`;
3. Instalado Expo Router e aplicado layouts para roteamento interno;
4. Adicionado um arquivo de mock de dados de eventos;
