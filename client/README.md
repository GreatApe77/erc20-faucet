
## Instalação

Na pasta ./client rode o seguinte comando:

```bash
  npm ci
```
    
## Gerar o Build do projeto 

Execute o comando a seguir

```bash
  npm run build
```

## Executar como desenvolvimento

Execute os seguintes comandos:

1. Gerar os contratos tipados pela ABI

```bash
  npm run generatetypes
```
2. Configurar as variáveis de ambiente com os valores corretos

```bash
  cp .env.example .env
```
3. Executar o servidor

```bash
  npm run dev
```