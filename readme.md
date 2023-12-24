# App

Barber-hub-api

## RFs (Requisitos funcionais)

Usuario:

- [x] Deve ser possivel se autenticar um usuario
- [x] Deve ser possivel editar as informações de um usuario
- [] Deve ser possivel fazer agendamento
- [] Deve ser possivel cancelar ou editar um agendamento
- [] Deve ser possivel avaliar uma barbearia
- [] Deve ser possivel editar uma avaliação
- [x] Deve ser possivel pesquisar pelo nome de uma barbearia
- [] Deve ser possivel receber notificações (whats) quando estiver proximo do horario agendado
- [] Deve ser possivel buscar por barbearias mais proximas (6)
- [] Deve ser possivel visualizar os 3 ultimos agendamentos
- [] Deve ser possivel repetir um agendamento

Barbearia:

- [x] Deve ser possivel autenticar uma barbearia
- [] Deve ser possivel cadastrar profissionais
- [x] Deve ser possivel cadastrar serviços
- [x] Deve ser possivel atualizar um serviço
- [] Deve ser possivel ver quadro de horarios
- [] Deve ser possivel entrar em contato com o cliente (whatsApp/ligar)
- [] Deve ser possivel controlar seus horarios
- [x] Deve ser possivel cadastrar, gerenciar e editar informações da barbearia: fotos, nome, horario de atendimento, ENDEREÇO

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] a senha deve ter no minimo 6 caracteres
- [] pode recuperar a senha caso tenha esquecido
- [] o usuario não pode criar dois ou mais agendamentos no mesmo horario
- [] o usuario não pode agendar em horario indisponivel
- [] o usuario não pode cancelar agendamentos faltando uma hora pra ser atendido

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Data e hora em Timestamp
