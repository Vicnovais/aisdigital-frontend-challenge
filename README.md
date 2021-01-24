[![Netlify Status](https://api.netlify.com/api/v1/badges/193614e5-cbdf-403c-a4c6-3441a6c1c5bb/deploy-status)](https://app.netlify.com/sites/aisdigital-frontend-challenge/deploys)

# Ília Digital - Front-End Challenge

## Introdução

O objetivo deste desafio é desenvolver um app para exibir as cartas do jogo pokémon TCG. Há duas telas que o usuário terá acesso: a primeira demonstra em formato de lista (desktop) ou carrosel (mobile) as cartas do jogo; a segunda demonstra em detalhes a carta escolhida na primeira tela.

## Preset

Para este projeto, o seguinte preset foi utilizado:
- Vue
- Babel
- Vue Router
- Vuex
- SASS
- Linter + Formatter
- Unit test (Jest)
- E2E test (Cypress)

## Arquitetura

Os diagramas a seguir mostram a arquitetura proposta para os componentes e para a store do Vuex:

![Componentes](https://user-images.githubusercontent.com/7889190/105641478-ecf1af00-5e62-11eb-8ca5-f894e89f4d2b.png)

### Componentes

**1. SearchInput:** componente responsável pela pesquisa por nome

**2. DataGrid:** componente responsável por mostrar as cartas em formato de grid no desktop

**3. Carousel:** componente responsável por controlar o carrosel no mobile

**4. CarouselCard:** componente responsável por exibir as informações das cartas no carrosel do mobile

**5. AttacksModal:** componente responsável pela exibição do modal de detalhe dos ataques da carta

**6. Loading:** componente responsável por exibir o loading em tela quando há uma chamada para a API


### Views

**1. Home:** view principal com a lista de cartas (para o desktop em formato de grid, e para o mobile em formato de carrossel)

**2. Detail:** view com o detalhe da carta escolhida na Home (via clique na linha do grid, ou via clique no carrossel)


### Pokémon API

Para obter os dados das cartas, foi utilizada a API pública [Pokémon TCG](https://pokemontcg.io/)

**Pontos Importantes:**

* A chamada padrão da API retorna os 100 primeiros registros. Esta foi a chamada utilizada no projeto. As 100 cartas são paginadas no cliente com 4 cartas por página.
* A paginação no desktop ocorre pelas próprias páginas do grid, com botões para avançar ou retroceder. No mobile, a paginação é feita pelo scroll do carrossel, sendo que a página seguinte é obtida automaticamente ao chegar no fim do scroll.
* A API, por ser pública, possui algumas restrições de quantidade de chamadas. É possível que haja um retorno com código 429 (Throttled), indicando que o limite foi atingido temporariamente.
* Foi implementado um sistema de cache para diminuir a quantidade de chamadas para a API


### Store

![Store](https://user-images.githubusercontent.com/7889190/105641479-ed8a4580-5e62-11eb-892a-cc7c4e29d35c.png)

**1. Actions**
- SEARCH: responsável pela ação de busca por nome (via API)
- GET_ALL: responsável pela ação de obter todas as cartas (via API)
- DETAIL: responsável pela ação de buscar o detalhe da carta (via API)
- NEXT_PAGE: responsável por avançar uma página dos dados
- PREV_PAGE: responsávle por retroceder uma página dos dados

**2. Mutations**
- ON_SEARCH: muda o estado dos dados do app (grid/carrossel; via buscar)
- ON_GET_ALL: muda o estado dos dados do app (grid/carrossel; tela principal)
- ON_NEXT_PAGE: muda o estado dos dados do app (avança uma página)
- ON_PREV_PAGE: muda o estado dos dados do app (retrocede uma página)
- ON_DETAIL: muda o estado do dado do detalhe do app
- START_LOADING: muda o estado do loading do app (ativando)
- END_LOADING: muda o estado do loading do app (desativando)

O diagrama a seguir mostra como os componentes e views do app se relacionam com as ações e mutações da store:

![ActionFlow](https://user-images.githubusercontent.com/7889190/105641474-e9f6be80-5e62-11eb-9d67-2d64dc7e7b19.png)


## Requisitos

**1. Mandatórios**

* :white_check_mark: A aplicação deverá ser responsiva, mobile-first
* :white_check_mark: A aplicação deverá utilizar a funcionalidade de rotas
* :white_check_mark: A lista de cartas deverá estar ordenada por nome
* :white_check_mark: A aplicação deve conter a funcionalidade de busca por nome
* :white_check_mark: Localização/Internacionalização (não necessário traduzir mas com suporte)
* :white_check_mark: Build funcional (vamos baixar e executar o código)
* :white_check_mark: Conter testes E2E
* :white_check_mark: Conter testes unitários
* :white_check_mark: Utilizar SASS(variáveis, mixins, etc)
* :white_check_mark: Utilizar Store Reativa (Vuex, Redux, etc)

**2. Opcionais**

* :white_check_mark: Código publicado/implantado


## Versão em Produção

A versão em produção deste projeto pode ser visualizada em: https://aisdigital-frontend-challenge.netlify.app

## Localização/Internacionalização

O aplicativo está preparado para a tradução em português e em inglês. Para configurar o idioma do aplicativo basta alterar a chave VUE_APP_LOCALE do arquivo .env presente na raiz do projeto (pt_BR = Português; en_US = Inglês).


## Instalando e Executando
Para instalar o projeto, basta baixá-lo localmente a partir deste repositório e executar na pasta do projeto o comando a seguir:
```
npm install
```

### Executar em modo de desenvolvimento
Para executar o projeto em modo de desenvolvimento em um servidor local, basta executar o comando a seguir:
```
npm run serve
```

Após o build em desenvolvimento, é possível acessar o app pelo browser utilizando o link a seguir:
```
http://localhost:8080
```

### Compilar para produção
Para compilar o projeto em modo de produção, basta executar o comando a seguir:
```
npm run build
```

### Testes Unitários (Jest)
Para executar os testes unitários do projeto, basta executar o comando a seguir:
```
npm run test:unit
```

### Testes E2E (Cypress)
Para executar os testes E2E do projeto, basta executar o comando a seguir.

IMPORTANTE: por limitações da API pública utilizada, é possível que alguns testes falhem por conta das múltiplas requisições que são feitas seguidamente.

```
npm run test:e2e
```

Após a execução do comando, a tela do Cypress abrirá. Nesta tela, clique em "test.js":

![Cypress](https://user-images.githubusercontent.com/7889190/105642202-0c8ad680-5e67-11eb-9e71-a95f14049cf7.png)

### Lint
Para executar o comando de lint do projeto, basta executar o comando a seguir:
```
npm run lint
```