# App

Barber-hub-api

## RFs (Requisitos funcionais)

Usuario:

- [] Deve ser possivel se autenticar um usuario
- [] Deve ser possivel editar as informações de um usuario
- [] Deve ser possivel fazer agendamento
- [] Deve ser possivel cancelar ou editar um agendamento
- [] Deve ser possivel avaliar uma barbearia
- [] Deve ser possivel editar uma avaliação
- [] Deve ser possivel pesquisar pelo nome de uma barbearia
- [] Deve ser possivel receber notificações (whats) quando estiver proximo do horario agendado
- [] Deve ser possivel buscar por barbearias mais proximas (6)
- [] Deve ser possivel visualizar os 3 ultimos agendamentos
- [] Deve ser possivel repetir um agendamento

Barbearia:

- [] Deve ser possivel autenticar uma barbearia
- [] Deve ser possivel cadastrar profissionais
- [] Deve ser possivel cadastrar serviços
- [] Deve ser possivel ver quadro de horarios
- [] Deve ser possivel entrar em contato com o cliente (whatsApp/ligar)
- [] Deve ser possivel controlar seus horarios
- [] Deve ser possivel cadastrar, gerenciar e editar informações da barbearia: fotos, nome, horario de atendimento, ENDEREÇO

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado
- [] a senha deve ter no minimo 6 caracteres
- [] pode recuperar a senha caso tenha esquecido
- [] o usuario não pode criar dois ou mais agendamentos no mesmo horario
- [] o usuario não pode agendar em horario indisponivel
- [] o usuario não pode cancelar agendamentos faltando uma hora pra ser atendido

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário precisa estar criptografada
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [] Data e hora em Timestamp
