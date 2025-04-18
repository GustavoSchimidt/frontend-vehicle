# FrontendVehicle

Projeto desenvolvido em Angular para gerenciamento de veículos.

## Passo a passo para rodar o projeto

1. **Pré-requisitos:**
   - Node.js (versão recomendada: 18+)
   - Angular CLI (versão 19.2.8)

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn start
   ```
   O aplicativo estará disponível em [http://localhost:4200/](http://localhost:4200/).

## Páginas e Rotas Disponíveis

- `/` — **Home**: Página inicial do sistema.
- `/vehicles` — **Lista de Veículos**: Exibe todos os veículos cadastrados.
- `/vehicles/new` — **Novo Veículo**: Formulário para cadastrar um novo veículo.
- `/vehicles/:id` — **Detalhes do Veículo**: Exibe detalhes de um veículo específico.
- `/vehicles/edit/:id` — **Editar Veículo**: Formulário para editar um veículo existente.
- Qualquer rota não encontrada (`**`) redireciona para a Home (`/`).

## Estrutura do Projeto

- `src/app/components/` — Componentes principais (Home, Lista, Detalhe, Formulário)
- `src/app/models/` — Modelos de dados
- `src/app/services/` — Serviços para comunicação com API/dados

## Backnend
O backend do projeto está disponível no repositório https://github.com/GustavoSchimidt/vehicle-hexagonal
Certifique-se de seguir as instruções do backend para configurar e executar o servidor.
