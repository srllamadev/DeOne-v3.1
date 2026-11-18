# Stellar Game Wallet

Billetera digital gamificada construida sobre la blockchain **Stellar**, con una interfaz visual inspirada en videojuegos de estrategia. Combina funcionalidades de wallet tradicional (saldos, envios, recepcion de activos, historial) con mecanicas de progresion, recompensas, misiones y cofres.

## Objetivo

Ofrecer una experiencia de gestion de activos digitales accesible y entretenida, donde cada interaccion con la blockchain se presenta como parte de una experiencia de juego con progresion visual, sin custodiar fondos del usuario.

## Tecnologias

| Capa | Tecnologias |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Phaser 3, Zustand, TanStack Query, React Router, React Hook Form, Zod, Lucide React |
| **Backend** | Node.js, Express 5, TypeScript, Prisma ORM, Zod, Helmet, CORS, jose (JWT), bcrypt |
| **Blockchain** | Stellar JavaScript SDK, Soroban SDK v29 (Rust), Stellar CLI v28 |
| **Base de datos** | PostgreSQL 17 (Docker) |
| **Infraestructura** | pnpm Workspaces, Docker Compose, GitHub Actions |
| **Despliegue** | Vercel (planificado), Stellar Testnet |

## Arquitectura del monorepo

| Carpeta | Funcion |
|---|---|
| `apps/web` | Frontend React + Vite con interfaz gamificada y Phaser |
| `apps/api` | Backend Express + Prisma con autenticacion JWT |
| `contracts/` | Smart contracts Soroban (Rust): wallet, rewards, treasury |
| `packages/shared` | Tipos TypeScript, esquemas Zod y utilidades compartidas |
| `packages/stellar` | Configuracion de red Stellar y utilidades seguras para el navegador |
| `packages/game-config` | Constantes y configuracion de la capa gamificada |
| `infra/` | Docker Compose para PostgreSQL local |
| `docs/` | Documentacion de arquitectura y desarrollo |
| `.github/workflows/` | Pipelines de CI (frontend, backend, contratos) |

## Requisitos previos

- **Node.js** >= 20
- **pnpm** >= 12
- **Docker** y Docker Compose (para PostgreSQL local)
- **Rust** >= 1.82 (para smart contracts)
- **Stellar CLI** >= 25.2

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd stellar-game-wallet

# Instalar dependencias
pnpm install

# Copiar variables de entorno
cp .env.example .env
```

## Configuracion de variables de entorno

Editar `.env` con los valores necesarios:

```bash
# API
NODE_ENV=development
PORT=3001
JWT_SECRET=tu-secreto-jwt-minimo-32-caracteres-aqui

# Database (PostgreSQL)
DATABASE_URL=postgresql://sgw_dev:sgw_dev_password@127.0.0.1:5432/stellar_wallet

# Stellar
STELLAR_NETWORK=TESTNET
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
```

## Ejecucion local

```bash
# Iniciar PostgreSQL en Docker
pnpm db:up

# Generar cliente Prisma
pnpm db:generate

# Ejecutar migraciones (requiere PostgreSQL corriendo)
pnpm db:migrate

# Iniciar frontend y backend en paralelo
pnpm dev

# O individualmente:
pnpm dev:web          # http://localhost:5173
pnpm dev:api          # http://localhost:3001
```

## Comandos disponibles

| Comando | Descripcion |
|---|---|
| `pnpm dev` | Inicia frontend y backend en paralelo |
| `pnpm dev:web` | Inicia solo el frontend |
| `pnpm dev:api` | Inicia solo el backend |
| `pnpm build` | Compila todos los paquetes y apps |
| `pnpm lint` | Ejecuta ESLint en todo el monorepo |
| `pnpm test` | Ejecuta pruebas en todo el monorepo |
| `pnpm typecheck` | Verifica tipos TypeScript |
| `pnpm db:up` | Inicia PostgreSQL con Docker |
| `pnpm db:down` | Detiene PostgreSQL |
| `pnpm db:migrate` | Ejecuta migraciones de Prisma |
| `pnpm db:generate` | Genera cliente Prisma |
| `pnpm contracts:build` | Compila contratos a WASM (via stellar CLI) |
| `pnpm contracts:test` | Ejecuta pruebas de contratos |
| `pnpm contracts:fmt` | Formatea codigo Rust |
| `pnpm format` | Formatea con Prettier |

## Pruebas y compilacion

```bash
# Pruebas del backend
pnpm test

# Compilacion completa
pnpm build

# Contratos (nativo)
cd contracts && cargo test

# Contratos (WASM)
cd contracts && stellar contract build
```

## Funcionalidades implementadas

### Backend API

| Endpoint | Metodo | Descripcion |
|---|---|---|
| `/health` | GET | Estado del servicio |
| `/auth/register` | POST | Registro de usuario (email, username, password) |
| `/auth/login` | POST | Inicio de sesion (devuelve JWT) |
| `/auth/me` | GET | Perfil del usuario autenticado |
| `/wallets` | GET | Listar wallets del usuario |
| `/wallets` | POST | Crear nueva wallet (genera par de claves Stellar) |
| `/wallets/:id/balances` | GET | Consultar saldos en red Stellar |
| `/wallets/:id/transactions` | GET | Historial de operaciones |
| `/wallets/fund` | POST | Fondear wallet desde Friendbot (Testnet) |

### Frontend

- Pagina de inicio con motor Phaser integrado (menu principal animado)
- Registro y login con validacion de formularios
- Dashboard con lista de wallets
- Detalle de wallet con saldos en tiempo real
- Historial de transacciones con enlace a Stellar Expert
- Fondeo de wallets desde Testnet
- Estado global con Zustand
- Consultas cache con TanStack Query

## Despliegue futuro

- **Frontend:** Vercel (estatico + SPA).
- **Backend:** Vercel Functions (serverless).
- **PostgreSQL:** Proveedor gestionado (Neon, Supabase, Railway, etc.).
- **Smart Contracts:** Stellar Testnet, con migracion futura a Mainnet.

## Estado actual del proyecto

**Infraestructura y funcionalidades base completadas:**

- Monorepo con pnpm Workspaces.
- Frontend con React + Vite + Tailwind CSS + Phaser.
- Backend con Express + Prisma + autenticacion JWT + bcrypt.
- Sistema completo de wallets (crear, consultar saldos, historial, fondear Testnet).
- PostgreSQL configurado con Docker Compose.
- Prisma ORM con esquema (usuarios, perfiles gamificados, wallets).
- Workspace Rust para smart contracts con Soroban SDK v29.
- 3 contratos base compilados a WASM (wallet, rewards, treasury).
- Paquetes compartidos (shared, stellar, game-config).
- GitHub Actions para CI.
- Documentacion tecnica.

**Pendiente de implementacion:** mecanicas de juego avanzadas (misiones, cofres, recompensas, progresion), logica de envio de pagos desde el cliente, contratos inteligentes funcionales, UI de cofres/recompensas.

## Licencia

Privado. Todos los derechos reservados.
