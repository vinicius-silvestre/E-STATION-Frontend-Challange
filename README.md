Projeto Challange eStation - Desenvolvido com Next.js, Tailwind CSS, Typescript e React.

## Vamos começar!

Primeiro faça a instalação dos pacotes utilizados para o projeto:

```bash
npm install
```

Primeiro rode na pasta principal comando abaixo para iniciar o projeto:

```bash
npm run dev
```

Logo em seguida, acesse a pasta /mock/data e rode o json-server na porta 3001

```bash
json-server db.json --port 3001
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador e veja o resultado.


## Desafios

O desafio será implementar um dashboard com dados de medição de energia elétrica que deverá ter as seguintes funcionalidades:
- [ ] Uma visão comparando o consumo mês a mês entre os anos de 2021 e 2022
- [x] Uma visão exibindo apenas as medições hora a hora com base no dia, mês e ano selecionados
- [x]  Uma visão com as medições horárias da última semana
- [x]  Uma tabela com a relação de medições que permita:
    -   [x] Filtrar medições por período
    -   [x] Paginação dos resultados retornados
    -   [x]  Ordenação pelos campos: Agente, Ponto, Data, Hora, Consumo Ativo (MWh) e Origem
 



