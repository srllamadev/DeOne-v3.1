# Guía de desarrollo — Stellar Game Wallet

## Requisitos

- Node.js >= 20
- pnpm >= 12
- Docker y Docker Compose
- Rust (para smart contracts)
- Stellar CLI

## Instalación

```bash
pnpm install
```

## Desarrollo

### Base de datos

```bash
pnpm db:up              # Inicia PostgreSQL en Docker
pnpm db:generate        # Genera el cliente Prisma
pnpm db:migrate         # Ejecuta migraciones
```

### Frontend

```bash
pnpm dev:web            # http://localhost:5173
```

### Backend

```bash
pnpm dev:api            # http://localhost:3001
```

### Todo en paralelo

```bash
pnpm dev
```

## Smart Contracts

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
cargo test
```

### Desplegar en Testnet

```bash
stellar contract build
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/<contract>.wasm \
  --network testnet \
  --source <alias>
```

## Variables de entorno

Copiar `.env.example` a `.env` y ajustar los valores necesarios.

## Estructura de módulos del backend

Cada módulo en `src/modules/` sigue la estructura:

```
modules/<name>/
├── <name>.routes.ts
├── <name>.service.ts
└── __tests__/
```
