# Solidity API

## FaucetBank

Banco de faucets para o GreatApe77 Coin

### FaucetBank__TokenNotSetted

```solidity
error FaucetBank__TokenNotSetted()
```

_Erro lancado quando o endereco do token nao foi setado_

### FaucetBank__ClaimIntervalNotReached

```solidity
error FaucetBank__ClaimIntervalNotReached()
```

_Erro lancado quando o intervalo de tempo entre cada claim nao foi atingido_

### greatApe77Coin

```solidity
contract IERC20 greatApe77Coin
```

Token GreatApe77 Coin

### nextClaim

```solidity
mapping(address => uint256) nextClaim
```

Mapeia o endereco do usuario para o proximo claim

### claimAmount

```solidity
uint256 claimAmount
```

Quantidade de tokens que serao enviados a cada claim

### claimInterval

```solidity
uint256 claimInterval
```

Intervalo de tempo entre cada claim

### ClaimAmountChanged

```solidity
event ClaimAmountChanged(uint256 newAmount)
```

Evento emitido quando a quantidade de tokens que serao enviados a cada claim for alterada

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newAmount | uint256 | Nova quantidade de tokens que serao enviados a cada claim |

### ClaimIntervalChanged

```solidity
event ClaimIntervalChanged(uint256 newInterval)
```

Evento emitido quando o intervalo de tempo entre cada claim for alterado

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newInterval | uint256 | Novo intervalo de tempo entre cada claim |

### constructor

```solidity
constructor(address tokenAddress) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | Endereco do token GreatApe77 Coin |

### claimFaucets

```solidity
function claimFaucets(address to) external
```

Envia tokens GreatApe77 Coin para um endereco

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | Endereco que recebera os tokens |

### withdrawAmount

```solidity
function withdrawAmount(uint256 amount) external
```

o dono do banco de faucets pode retirar tokens GreatApe77 Coin

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | Quantidade de tokens que serao enviados |

### setTokenAddress

```solidity
function setTokenAddress(address tokenAddress) external
```

configura o endereco do token GreatApe77 Coin

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenAddress | address | Endereco do token GreatApe77 Coin |

### setClaimAmount

```solidity
function setClaimAmount(uint256 amount) external
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | Nova quantidade de tokens que serao enviados a cada claim |

### setClaimIntervalInSeconds

```solidity
function setClaimIntervalInSeconds(uint256 intervalInSeconds) external
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| intervalInSeconds | uint256 | Novo intervalo de tempo entre cada claim |

## GreatApe77Coin

Implementacao do token GreatApe77 Coin

### CREATOR

```solidity
string CREATOR
```

Criador do contrato

### constructor

```solidity
constructor(address initialSupplyReceiver) public
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| initialSupplyReceiver | address | Endereco que recebera a quantidade total de tokens |

## Ownable

Implementacao do contrato Ownable

### onlyOwner

```solidity
modifier onlyOwner()
```

Modificador que restringe o acesso a funcao apenas para o dono do contrato

### constructor

```solidity
constructor() public
```

Construtor que define o dono do contrato como o endereco que o criou

### owner

```solidity
function owner() public view returns (address)
```

Retorna o endereco do dono do contrato

### transferOwnership

```solidity
function transferOwnership(address newOwner) external
```

Só pode ser chamada pelo dono do contrato

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner | address | Endereco do novo dono do contrato |

### renounceOwnership

```solidity
function renounceOwnership() external
```

Só pode ser chamada pelo dono do contrato
Remove o dono do contrato Para sempre

### _setOwner

```solidity
function _setOwner(address newOwner) internal
```

_Funcao interna que define o endereco do dono do contrato_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner | address | Endereco do novo dono do contrato |

## IOwnable

Interface para implementacao de contratos que possuem um dono

### owner

```solidity
function owner() external view returns (address)
```

Retorna o endereco do dono do contrato

### transferOwnership

```solidity
function transferOwnership(address newOwner) external
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newOwner | address | Endereco do novo dono do contrato |

### renounceOwnership

```solidity
function renounceOwnership() external
```

Remove o dono do contrato Para sempre

### OwnershipTransferred

```solidity
event OwnershipTransferred(address previousOwner, address newOwner)
```

## IOwnableErrors

Interface para implementacao de contratos que possuem um dono

### Ownable__notOwner

```solidity
error Ownable__notOwner()
```

Erro emitido quando o endereco que chamou a funcao nao e o dono do contrato

### Ownable__newOwnerZeroAddress

```solidity
error Ownable__newOwnerZeroAddress()
```

Erro emitido quando o endereco do novo dono e o endereco zero

### Ownable__newOwnerSameAsCurrentOwner

```solidity
error Ownable__newOwnerSameAsCurrentOwner()
```

Erro emitido quando o endereco do novo dono é o endereco do dono atual

## ERC20

implementacao do padrao ERC20
se deseja trocar o decimals, reescreva a funcao decimals() e altere o valor de retorno utilizando o modificador override

### constructor

```solidity
constructor(string name_, string symbol_, uint256 totalSupply_, address initialSupplyReceiver) internal
```

Configuraçoes iniciais do token
decimals vem com o valor padrao de 18

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | string | Nome do token |
| symbol_ | string | Simbolo do token |
| totalSupply_ | uint256 | Quantidade total de tokens em circulacao (supply fixo) |
| initialSupplyReceiver | address | Endereco que recebera a quantidade total de tokens |

### name

```solidity
function name() external view returns (string)
```

Retorna o nome do token

### symbol

```solidity
function symbol() external view returns (string)
```

Retorna o simbolo do token

### decimals

```solidity
function decimals() public pure virtual returns (uint8)
```

Retorna a quantidade de casas decimais do token

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

Retorna o total de tokens em circulacao

### balanceOf

```solidity
function balanceOf(address account) public view returns (uint256)
```

### transfer

```solidity
function transfer(address to, uint256 value) external returns (bool)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | Endereco do destinatario dos tokens |
| value | uint256 | Quantidade de tokens a serem transferidos |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 value) external returns (bool)
```

Transfere tokens de um endereco para outro atraves de um endereco previamente aprovado

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereco do remetente dos tokens |
| to | address | Endereco do destinatario dos tokens |
| value | uint256 | Quantidade de tokens a serem transferidos |

### approve

```solidity
function approve(address spender, uint256 value) external returns (bool)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | address | Endereco a ser aprovado para transferir tokens da conta que esta chamando a funcao |
| value | uint256 | Quantidade de tokens a serem aprovados |

### allowance

```solidity
function allowance(address owner, address spender) public view returns (uint256)
```

Retorna a quantidade de tokens aprovados para um endereco especifico

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | Endereco do dono dos tokens |
| spender | address | Endereco a ser consultado para retornar a quantidade de tokens aprovados |

### _transfer

```solidity
function _transfer(address from, address to, uint256 value) internal
```

### _approve

```solidity
function _approve(address owner, address spender, uint256 value) internal
```

### _transferFrom

```solidity
function _transferFrom(address from, address to, uint256 value) internal
```

### _decrementAllowance

```solidity
function _decrementAllowance(address owner, address spender, uint256 value) internal
```

### _setBalance

```solidity
function _setBalance(address account, uint256 value) internal
```

### _setAllowances

```solidity
function _setAllowances(address owner, address spender, uint256 value) internal
```

## IERC20

Interface ERC20 padrao listada em https://eips.ethereum.org/EIPS/eip-20

### name

```solidity
function name() external view returns (string)
```

Retorna o nome do token

### symbol

```solidity
function symbol() external view returns (string)
```

Retorna o simbolo do token

### decimals

```solidity
function decimals() external view returns (uint8)
```

Retorna a quantidade de casas decimais do token

### totalSupply

```solidity
function totalSupply() external view returns (uint256)
```

Retorna o total de tokens em circulacao

### balanceOf

```solidity
function balanceOf(address owner) external view returns (uint256)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | Endereco do dono dos tokens a terem o saldo consultado |

### transfer

```solidity
function transfer(address to, uint256 value) external returns (bool)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | Endereco do destinatario dos tokens |
| value | uint256 | Quantidade de tokens a serem transferidos |

### transferFrom

```solidity
function transferFrom(address from, address to, uint256 value) external returns (bool)
```

Transfere tokens de um endereco para outro atraves de um endereco previamente aprovado

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | Endereco do remetente dos tokens |
| to | address | Endereco do destinatario dos tokens |
| value | uint256 | Quantidade de tokens a serem transferidos |

### approve

```solidity
function approve(address spender, uint256 value) external returns (bool)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| spender | address | Endereco a ser aprovado para transferir tokens da conta que esta chamando a funcao |
| value | uint256 | Quantidade de tokens a serem aprovados |

### allowance

```solidity
function allowance(address owner, address spender) external view returns (uint256)
```

Retorna a quantidade de tokens aprovados para um endereco especifico

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | Endereco do dono dos tokens |
| spender | address | Endereco a ser consultado para retornar a quantidade de tokens aprovados |

### Transfer

```solidity
event Transfer(address from, address to, uint256 value)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| from | address | O endereco de onde os tokens estao sendo transferidos |
| to | address | O endereco de destino dos tokens |
| value | uint256 | A quantidade de tokens a serem transferidos |

### Approval

```solidity
event Approval(address owner, address spender, uint256 value)
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | O endereco do dono dos tokens que esta aprovando |
| spender | address | O endereco que esta sendo aprovado para transferir os tokens |
| value | uint256 | A quantidade de tokens a serem aprovados |

## IERC20Errors

### ERC20__transferFromZeroAddress

```solidity
error ERC20__transferFromZeroAddress()
```

### ERC20__transferToZeroAddress

```solidity
error ERC20__transferToZeroAddress()
```

### ERC20__transferToSelf

```solidity
error ERC20__transferToSelf()
```

### ERC20__transferInsufficientBalance

```solidity
error ERC20__transferInsufficientBalance()
```

### ERC20__transferFromInsufficientBalance

```solidity
error ERC20__transferFromInsufficientBalance()
```

### ERC20__transferAllowanceInsufficientBalance

```solidity
error ERC20__transferAllowanceInsufficientBalance()
```

### ERC20__transferFromInsufficientAllowance

```solidity
error ERC20__transferFromInsufficientAllowance()
```

### ERC20__transferFromFromAddressZero

```solidity
error ERC20__transferFromFromAddressZero()
```

### ERC20__transferFromToAddressZero

```solidity
error ERC20__transferFromToAddressZero()
```

### ERC20__transferFromWithValueZero

```solidity
error ERC20__transferFromWithValueZero()
```

### ERC20__approveToZeroAddress

```solidity
error ERC20__approveToZeroAddress()
```

### ERC20__approveFromZeroAddress

```solidity
error ERC20__approveFromZeroAddress()
```

### ERC20__approveInsufficientBalance

```solidity
error ERC20__approveInsufficientBalance()
```

### ERC20__approveFromInsufficientAllowance

```solidity
error ERC20__approveFromInsufficientAllowance()
```

## DummyERC20

Implementacao de um token ERC20 para testes

### constructor

```solidity
constructor(string name, string symbol, uint256 totalSupply, address initialSupplyReceiver) public
```

## DummyOwnable

### constructor

```solidity
constructor() public
```

