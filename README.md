# Stellar Game Wallet

Billetera digital gamificada construida sobre la blockchain **Stellar**, con una interfaz visual inspirada en videojuegos de estrategia. Combina funcionalidades de wallet tradicional (saldos, envíos, recepción de activos, historial) con mecánicas de progresión, recompensas, misiones y cofres.

## Objetivo

Ofrecer una experiencia de gestión de activos digitales accesible y entretenida, donde cada interacción con la blockchain se presenta como parte de una experiencia de juego con progresión visual, sin custodiar fondos del usuario.

## Tecnologías

| Capa | Tecnologías |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Phaser 3, Zustand, TanStack Query, React Router, Lucide React |
| **Backend** | Node.js, Express 5, TypeScript, Prisma ORM, Zod, Helmet, CORS |
| **Blockchain** | Stellar JavaScript SDK, Soroban SDK (Rust), Stellar CLI |
| **Base de datos** | PostgreSQL 17 (Docker) |
| **Infraestructura** | pnpm Workspaces, Docker Compose, GitHub Actions |
| **Despliegue** | Vercel (planificado), Stellar Testnet |

## Arquitectura del monorepo

| Carpeta | Función |
|---|---|
| `apps/web` | Frontend React + Vite con interfaz gamificada |
| `apps/api` | Backend Express + Prisma |
| `contracts/` | Smart contracts Soroban (Rust): wallet, rewards, treasury |
| `packages/shared` | Tipos TypeScript, esquemas Zod y utilidades compartidas |
| `packages/stellar` | Configuración de red Stellar y utilidades seguras para el navegador |
| `packages/game-config` | Constantes y configuración de la capa gamificada |
| `infra/` | Docker Compose para PostgreSQL local |
| `docs/` | Documentación de arquitectura y desarrollo |
| `.github/workflows/` | Pipelines de CI (frontend, backend, contratos) |

## Requisitos previos

- **Node.js** >= 20
- **pnpm** >= 12
- **Docker** y Docker Compose (para PostgreSQL local)
- **Rust** (para smart contracts, opcional en desarrollo web)
- **Stellar CLI** (para despliegue de contratos)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd stellar-game-wallet

# Instalar dependencias
pnpm install
```

## Configuración de variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con los valores necesarios. Las variables incluyen configuración de la API, PostgreSQL y conexión a Stellar Testnet.

## Ejecución local

```bash
# Iniciar PostgreSQL en Docker
pnpm db:up

# Generar cliente Prisma
pnpm db:generate

# Ejecutar migraciones (requiere PostgreSQL corriendo)
pnpm db:migrate

# Iniciar frontend
pnpm dev:web          # http://localhost:5173

# Iniciar backend
pnpm dev:api          # http://localhost:3001

# Iniciar todo en paralelo
pnpm dev
```

## Comandos disponibles

| Comando | Descripción |
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
| `pnpm contracts:build` | Compila contratos a WASM |
| `pnpm contracts:test` | Ejecuta pruebas de contratos |
| `pnpm contracts:fmt` | Formatea código Rust |
| `pnpm format` | Formatea con Prettier |

## Pruebas y compilación

```bash
# Pruebas del backend
pnpm test

# Compilación completa
pnpm build

# Contratos
cd contracts && cargo test
cd contracts && cargo build --target wasm32-unknown-unknown --release
```

## Despliegue futuro

- **Frontend:** Vercel (estático + SPA).
- **Backend:** Vercel Functions (serverless).
- **PostgreSQL:** Proveedor gestionado (Neon, Supabase, Railway, etc.).
- **Smart Contracts:** Stellar Testnet, con migración futura a Mainnet.

## Estado actual del proyecto

**Infraestructura inicial.** Se han creado:

- Monorepo con pnpm Workspaces configurado.
- Frontend mínimo con React + Vite + Tailwind CSS.
- Backend mínimo con Express + endpoint `/health`.
- PostgreSQL configurado con Docker Compose.
- Prisma ORM con esquema inicial (usuarios, perfiles, wallets).
- Workspace Rust para smart contracts con módulos base.
- Paquetes compartidos (shared, stellar, game-config).
- GitHub Actions para CI de frontend, backend y contratos.
- Documentación técnica básica.

**No se han implementado** funcionalidades de negocio, transacciones reales, mecánicas de juego, autenticación ni contratos inteligentes completos.

## Licencia

Privado. Todos los derechos reservados.
