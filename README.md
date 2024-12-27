## Regras da aplicação
 - [x] Deve ser possível cadastrar um pet.
 - [x] Deve ser possível listar os estados cadastrados no sistema
 - [x] Deve ser possíel listar as cidades cadastradas no sistema
 - [x] Deve ser possível listar as cidades por estado
 
 - [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade.
 - [x] Deve ser possível filtrar pets por suas características.
 - [x] Deve ser possível visualizar detalhes de um pet para adoção.
 - [ ] Deve ser possível se cadastrar como uma ORG.
 - [ ] Deve ser possível realizar login como uma ORG.
 - [x] Deve ser possível buscar os requerimentos de adoção de um pet.
 - [x] Deve ser possível encontrar as cidades pelo nome.
 - [x] Deve ser possível encontrar um estado pelo nome.

## Regras de negócio
 - [x] Para listar os pets, obrigatoriamente precisamos informar a cidade.
 - [ ] Uma ORG precisa ter um endereço e um número de WhatsApp.
 - [ ] Uma ORG deve ter um cep válido.
 - [x] Um pet deve estar ligado a uma ORG.
 - [x] Só deve ser possível solicitar requerimentos de adoção de pets que estão disponíveis para adoção.
 - [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp.
 - [ ] Todos os filtros, além da cidade, são opcionais.
 - [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada.
 - [ ] Quando uma ORG for criada em uma cidade e estado que não existem no sistema, eles devem ser criados.
 - [X] Não deve ser possível cadastrar dois estados com o mesmo nome
 - [X] Não deve ser possível cadastrar duas cidades com o mesmo nome
 - [ ] Uma cidade não deve existir sem um estado