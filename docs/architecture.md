# Arquitectura — Stellar Game Wallet

## Visión general

Stellar Game Wallet es una aplicación web de billetera digital construida sobre la blockchain Stellar, con una interfaz gamificada inspirada en videojuegos de estrategia visual. Combina funcionalidades de wallet tradicional con mecánicas de progresión, recompensas y personalización.

## Arquitectura del monorepo

```
stellar-game-wallet/
├── apps/
│   ├── web/          # Frontend React + Vite + Phaser
│   └── api/          # Backend Express + Prisma
├── contracts/        # Smart contracts Soroban (Rust)
├── packages/         # Paquetes compartidos internos
│   ├── shared/       # Tipos, esquemas Zod, utilidades
│   ├── stellar/      # Configuración de red Stellar
│   └── game-config/  # Constantes de gamificación
├── infra/            # Docker Compose (PostgreSQL)
├── docs/             # Documentación técnica
└── .github/          # CI/CD
```

## Frontend (apps/web)

- **React 19 + TypeScript** como base de UI.
- **Vite** para el bundling y desarrollo.
- **Tailwind CSS** para los estilos.
- **Phaser 3** para las pantallas de juego, integrado de forma modular.
- **Zustand** para estado local.
- **TanStack Query** para el manejo de datos remotos.
- **React Router** para el enrutamiento.
- La lógica de wallet se separa en `src/wallet/`.
- La lógica de juego se separa en `src/game/`.

## Backend (apps/api)

- **Express 5** como servidor HTTP.
- **Prisma ORM** para el acceso a datos.
- **PostgreSQL 17** como base de datos principal.
- Estructura modular por dominios en `src/modules/`.
- Compatible con despliegue en Vercel Functions.
- `app.ts` crea la aplicación, `server.ts` inicia el servidor.

## Smart Contracts (contracts/)

- Workspace Rust con **Soroban SDK**.
- Tres módulos independientes: `wallet`, `rewards`, `treasury`.
- Desarrollo contra Stellar Testnet.
- No almacena claves privadas ni secretos.

## Base de datos

- PostgreSQL 17 en Docker para desarrollo local.
- Modelo: `User` → `GameProfile` (1:1), `User` → `Wallet` (1:N).
- No almacena claves privadas ni frases semilla de Stellar.

## Despliegue

- **Frontend:** Vercel (estático + SPA).
- **Backend:** Vercel Functions (serverless).
- **PostgreSQL:** Proveedor gestionado (Neon, Supabase, etc.).
- **Contratos:** Stellar Testnet/Futurenet.
