# Stellar Game Wallet

Billetera digital gamificada construida sobre la blockchain **Stellar**, Combina funcionalidades de wallet tradicional (saldos, envios, recepcion de activos, historial) con mecanicas de progresion, recompensas, misiones y cofres.

## Objetivo

Ofrecer una experiencia de gestion de activos digitales accesible y entretenida, donde cada interaccion con la blockchain se presenta como parte de una experiencia visual, sin custodiar fondos del usuario.

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

---

# DeOne — La wallet gamificada sobre Stellar

> **Tu wallet, más divertida.** Una wallet de pagos en Stellar donde una mascota (un gecko) *ejecuta visualmente* cada operación financiera: paga, cobra con QR, revisa el historial, ahorra. Mientras más usas la wallet de forma sana, más evoluciona la mascota.

| | |
|---|---|
| **Red** | Stellar (Soroban + operaciones clásicas) |
| **Onboarding / wallet / transacciones** | [Pollar](https://pollar.xyz) (`@pollar/core`, `@pollar/react`) |
| **Ahorro gamificado** | [Vaquita](https://vaquita.fi) (contratos Soroban `vaquita-pool`, API, Blend, DeFindex) |
| **Mercado inicial** | Bolivia / LATAM (display en Bs) |
| **Estado** | Diseño de arquitectura + mockups. Ver [§14 Estado de verificación](#14-estado-de-verificación-y-supuestos) |

---

## Guía rápida para agentes revisores

Si eres un agente (o un humano con prisa) que revisa este repo, empieza aquí:

1. **¿Qué es?** Una app móvil de pagos QR + ahorro sobre Stellar. La mascota es una *capa de presentación* que reacciona a eventos reales de la wallet. **La mascota nunca mueve dinero ni decide nada**: solo renderiza estados.
2. **Invariantes que deben cumplirse** (revísalos primero):
   - I1. Ninguna clave secreta (`sk_*`, Pollar secret key, service keys) existe en el bundle móvil. Ver [§10](#10-seguridad-y-privacidad).
   - I2. El XP y el nivel se calculan **en el backend a partir de eventos on-chain**, nunca por reclamos del cliente. Ver [§7](#7-motor-de-xp-niveles-y-anti-abuso).
   - I3. Una animación solo se dispara con un `WalletEvent` tipado (§6); la UI no puede "inventar" un pago exitoso.
   - I4. Un saldo `null` (no legible) se muestra como "no disponible", **nunca como `0`** (comportamiento heredado de Pollar ≥ 0.11.1).
   - I5. Los montos se **truncan, no se redondean**, y "Máx" mueve el saldo completo (lección tomada de Vaquita PR #130).
3. **Dónde mirar:** estructura del repo en [§4](#4-estructura-del-repositorio), contratos de eventos en [§6](#6-la-mascota-como-máquina-de-estados), pruebas en [§12](#12-pruebas-y-calidad).
4. **Qué NO está verificado** y es decisión abierta: [§14](#14-estado-de-verificación-y-supuestos). Lo marcamos explícitamente en vez de afirmarlo.

---

## Tabla de contenidos

1. [Visión y problema](#1-visión-y-problema)
2. [Por qué esta arquitectura es la mejor opción (argumento honesto)](#2-por-qué-esta-arquitectura-es-la-mejor-opción)
3. [Arquitectura general](#3-arquitectura-general)
4. [Estructura del repositorio](#4-estructura-del-repositorio)
5. [Integración con Pollar](#5-integración-con-pollar)
6. [La mascota como máquina de estados](#6-la-mascota-como-máquina-de-estados)
7. [Motor de XP, niveles y anti-abuso](#7-motor-de-xp-niveles-y-anti-abuso)
8. [Flujos de pago con QR](#8-flujos-de-pago-con-qr)
9. [Integración con Vaquita (ahorro)](#9-integración-con-vaquita-ahorro)
10. [Seguridad y privacidad](#10-seguridad-y-privacidad)
11. [Pantallas y sistema de diseño](#11-pantallas-y-sistema-de-diseño)
12. [Pruebas y calidad](#12-pruebas-y-calidad)
13. [Roadmap](#13-roadmap)
14. [Estado de verificación y supuestos](#14-estado-de-verificación-y-supuestos)
15. [Riesgos y mitigaciones](#15-riesgos-y-mitigaciones)
16. [Glosario y referencias](#16-glosario-y-referencias)

---

## 1. Visión y problema

**Problema.** Las wallets cripto fallan en dos puntos: (a) el onboarding es hostil (frases semilla, trustlines, reservas mínimas, gas) y (b) pagar y ahorrar se siente como una tarea financiera, no como un hábito. En Bolivia y LATAM el pago por QR ya es un hábito cotidiano; lo que falta es una wallet con liquidación en Stellar que se sienta tan simple como esa experiencia.

**Propuesta.** DeOne combina tres capas:

| Capa | Resuelve | Proveedor |
|---|---|---|
| Onboarding + wallet + envío/recepción + historial + swap + earn + rampas | Fricción técnica | **Pollar** |
| Ahorro con incentivos de comunidad y yield | Retención y hábito de ahorro | **Vaquita** |
| Mascota + niveles + XP | Retención emocional y comprensión de cada acción | **DeOne (este repo)** |

**Principio de diseño central:** *cada operación financiera tiene una representación física en el mundo de la mascota.* Pagar = el gecko lanza una moneda. Cobrar = el gecko saca el QR. Historial = el gecko lee un pergamino. Esto convierte acciones abstractas en acciones comprensibles, algo valioso para usuarios nuevos en cripto.

---

## 2. Por qué esta arquitectura es la mejor opción

Un documento serio no debe afirmar "es la mejor" sin sustento. Este es el argumento, con sus límites.

### 2.1 Ventajas concretas (verificables en las fuentes)

| Decisión | Razón | Evidencia |
|---|---|---|
| **Pollar para wallet y transacciones** en vez de construir custodia/firma propia | Pollar ofrece login social/email/passkey, wallets embebidas, patrocinio de comisiones y trustlines, historial, swap multi-venue, earn, rampas SEP-24 y modales listos. Reduce meses de trabajo de seguridad crítica. | [README de `pollar-xyz/pollar`](https://github.com/pollar-xyz/pollar) |
| **Tokens ligados a DPoP (RFC 9449)** | Un token robado es inútil sin la clave de sesión del dispositivo; en React Native la clave vive en Keychain/EncryptedSharedPreferences. | Mismo README |
| **Patrocinio (gas abstraction) y trustlines patrocinadas** | El usuario nuevo con Bs 0,00 (primer mockup) puede operar sin comprar XLM antes. Es el requisito para que "Nivel 1 – Gecko recién nacido" sea real. | SCF #42 de Pollar; README |
| **Vaquita para ahorro** | Producto ya probado: según su sitio, el juego corrió 3+ meses con 200+ depositantes reales antes de llegar a Stellar; fondos en mercados de préstamo (Blend/DeFindex) y contratos abiertos. Recibió SCF #42 y "Best Integration" en Stellar Week Buenos Aires 2025. | [vaquita.fi](https://www.vaquita.fi/) |
| **Mismo ecosistema de protocolos DeFi** | Pollar *Earn* unifica vaults DeFindex y pools Blend; Vaquita se apoya en Blend y DeFindex. Los activos y la liquidez son compatibles. | READMEs de ambos |
| **Stellar como red** | Liquidación en segundos, comisiones muy bajas, ecosistema de anchors y estándares de pago (SEP-7, SEP-10, SEP-24). Está diseñada para pagos. | [stellar.org](https://www.stellar.org/) |
| **Mascota como capa desacoplada** | Al ser solo presentación sobre eventos tipados, se puede reemplazar el arte o añadir temporadas sin tocar la lógica financiera ni los contratos. | Diseño propio (§6) |

### 2.2 Diferenciador real frente a wallets convencionales

La mayoría de wallets "gamificadas" gamifican **gasto** (más transacciones = más puntos), lo que incentiva comportamientos dañinos. DeOne gamifica **hábitos sanos**: ahorro constante (vía Vaquita), pagos reales con contrapartes distintas, y racha de uso. Ver anti-abuso en §7.

### 2.3 Límites que declaramos

- Pollar es un SDK joven (versión 0.11.x al momento de redactar). Hay que **fijar versiones exactas** y seguir su `UPGRADE.md`.
- Pollar es JS/TS; no existe SDK nativo Dart/Swift/Kotlin oficial. Por eso el cliente móvil recomendado es **React Native / Expo** (soportado por `@pollar/core` con adaptadores de almacenamiento seguro).
- El módulo KYC de Pollar figura como *UI preview – backend coming soon*. No se puede depender de él para cumplimiento regulatorio hoy.
- El display en **bolivianos** requiere una decisión de activo (ver §14). Sin eso, el saldo "Bs" de los mockups es una conversión de presentación.

---

## 3. Arquitectura general

```mermaid
flowchart TB
  subgraph Mobile["App móvil (Expo / React Native)"]
    UI["Pantallas: Inicio, Movimientos, Servicios, Más, QR"]
    MASCOT["Mascot Engine (Rive state machine)"]
    BUS["Wallet Event Bus (tipado)"]
    POLLAR["@pollar/core + adaptadores"]
    UI --> BUS
    POLLAR --> BUS
    BUS --> MASCOT
    UI --> POLLAR
  end

  subgraph Backend["Backend DeOne (Node/TypeScript)"]
    IDX["Indexador de eventos Stellar"]
    XP["Motor de XP + anti-abuso"]
    API["API REST /api/v1"]
    DB[("Postgres")]
    IDX --> XP --> DB
    API --> DB
  end

  subgraph Pollar["Pollar"]
    PAPI["Pollar API v2 (auth, wallets, tx, history, swap, earn, ramps)"]
    PDASH["Dashboard: sponsorship, assets, analytics"]
  end

  subgraph Vaquita["Vaquita"]
    VAPI["API /api/v1"]
    VC["Soroban: vaquita-pool"]
  end

  subgraph Stellar["Red Stellar"]
    HZ["Horizon / RPC"]
    BLEND["Blend / DeFindex"]
  end

  POLLAR <--> PAPI
  PAPI --> HZ
  VC --> BLEND
  VC --> HZ
  IDX --> HZ
  API --> VAPI
  UI -->|XP, nivel, racha| API
  API -.->|"level_up, xp_gained (push/poll)"| BUS
```

**Regla de oro de flujo de datos:**

1. El usuario inicia una acción en la UI.
2. La acción pasa por **Pollar** (build → sign → submit).
3. El resultado real (éxito/fallo) se emite al **Event Bus**.
4. La **mascota** reacciona al evento.
5. En paralelo, el **indexador** observa la cadena y el **motor de XP** otorga puntos de forma independiente del cliente.

El cliente solo *muestra* XP; el backend lo *decide*.

---

## 4. Estructura del repositorio

Monorepo (recomendado: `pnpm` + Turborepo, coherente con las convenciones de ambos proyectos upstream).

```
deone/
├── apps/
│   ├── mobile/                 # Expo / React Native (app principal)
│   ├── api/                    # Backend: XP, niveles, indexador, webhooks
│   └── admin/                  # (opcional) panel interno de configuración de niveles
├── packages/
│   ├── wallet-core/            # Wrapper tipado sobre @pollar/core + Event Bus
│   ├── mascot/                 # Rive assets + MascotController + tablas de gear
│   ├── xp-engine/              # Reglas puras de XP/niveles (100% testeable, sin I/O)
│   ├── qr/                     # Codificación/decodificación SEP-7 + validación
│   ├── savings/                # Cliente Vaquita + adaptador a Pollar Earn
│   ├── ui/                     # Design system (tokens, componentes)
│   └── shared-types/           # WalletEvent, MascotState, DTOs
├── contracts/                  # (fase 2) Soroban: badges no transferibles, si se aprueba
├── docs/
│   ├── architecture.md
│   ├── mascot-state-machine.md
│   ├── xp-rules.md
│   ├── threat-model.md
│   └── adr/                    # Architecture Decision Records
├── .github/workflows/
├── AGENTS.md                   # Instrucciones para agentes (ver abajo)
└── README.md                   # Este documento
```

### `AGENTS.md` sugerido (resumen)

```md
# Instrucciones para agentes
- Antes de editar `packages/xp-engine`, ejecuta `pnpm --filter @deone/xp-engine test`.
- Nunca importes `@pollar/*` desde `packages/xp-engine` ni `packages/mascot` (deben ser puros).
- Nunca añadas claves a `apps/mobile`. Solo claves PUBLICABLES (`pk_*`).
- Todo cambio en reglas de XP requiere actualizar `docs/xp-rules.md` y añadir un test.
- Los montos son strings decimales; prohibido usar `number` para dinero.
```

---

## 5. Integración con Pollar

### 5.1 Paquetes a usar

| Paquete | Uso en DeOne |
|---|---|
| `@pollar/core` | Cliente framework-agnóstico (`PollarClient`): auth, transacciones, balances, historial, swap, earn, rampas. Es el que usa la app Expo. |
| `@pollar/react` | Solo para una **versión web** o *webview* de apoyo (modales listos de Send/Receive/History/Earn/Ramp). |
| `@pollar/privy-adapter` / `@pollar/accesly-adapter` | Opcionales si se quiere otro proveedor de wallet embebida. |
| `@pollar/stellar-wallets-kit-adapter` | Para usuarios avanzados que traigan su propia wallet (Freighter, Lobstr, xBull, etc.). |

> Fijar versiones **exactas** de `@pollar/core` y `@pollar/react` en la misma versión (Pollar lo exige). Leer `UPGRADE.md` antes de cada actualización.

### 5.2 Inicialización en Expo

```ts
// apps/mobile/src/wallet/client.ts
import 'react-native-get-random-values'; // primer import del entry point
import { PollarClient } from '@pollar/core';
import { createSecureStoreAdapter } from '@pollar/core/adapters/expo';

export async function createWalletClient() {
  const storage = await createSecureStoreAdapter();
  // SOLO clave publicable. Nunca una secret key en el móvil.
  return new PollarClient({ apiKey: process.env.EXPO_PUBLIC_POLLAR_PK!, storage });
}
```

Requisitos de Pollar: contexto seguro (HTTPS) para DPoP; en RN la clave se guarda en Keychain/EncryptedSharedPreferences.

### 5.3 Mapeo de operaciones DeOne → capacidades de Pollar

| Operación en DeOne | Capacidad de Pollar | Notas |
|---|---|---|
| Registro / login (Google, email OTP, passkey) | Auth de `PollarClient` | Wallet creada en segundo plano tras `POST /auth/login`. Ver §5.4. |
| Saldo | `refreshBalance()` / `getWalletBalance()` | `null` = no legible → mostrar "—" (invariante I4). |
| Pagar | Pipeline build → sign → submit | El resultado real dispara `payment_sent`. |
| Cobrar / mostrar QR | Dirección propia + SEP-7 (ver §8) | `ReceiveModal` de Pollar muestra la dirección en QR; DeOne añade monto y memo. |
| Historial | Historial paginado multichain | Dispara animación "pergamino". |
| Intercambiar | `getSwapQuote()` / `swap()` | Rutas SDEX / Soroswap / Aquarius. |
| Ahorrar / rendimiento | `getEarnOpportunities()`, `earnDeposit()`, `earnWithdraw()` | Vaults DeFindex y pools Blend con APY en vivo. |
| Cargar / retirar Bs | Rampas SEP-24 | Depende de un anchor que soporte la corredera. |
| Sesiones | `listSessions()`, `revokeSession()`, `logoutEverywhere()` | Pantalla "Seguridad". |

### 5.4 Aprovisionamiento de wallet y "Nivel 1"

Pollar crea la cuenta Stellar del usuario en segundo plano y expone `wallet.provisioning` (`READY | CREATING | FAILED`). DeOne lo mapea así:

| `provisioning` | Mascota | UI |
|---|---|---|
| `CREATING` | Huevo agrietándose (animación de nacimiento) | "Estamos preparando tu wallet…" |
| `READY` | **Gecko recién nacido** (Nivel 1) | Pantalla de inicio |
| `FAILED` | Gecko confundido + reintentar | Mensaje de error accionable |

Esto convierte una espera técnica en una escena de bienvenida y evita el estado inválido "wallet lista pero no existe" que Pollar documenta en 0.11.4 (`SDK_WALLET_NOT_READY`).

### 5.5 Patrocinio de comisiones

Configurar en el dashboard de Pollar: presupuesto de patrocinio por entorno, activos habilitados y política de trustlines. Recomendación: patrocinar **solo** operaciones de bajo riesgo (crear cuenta, trustline, pagos pequeños) y poner topes por usuario/día para evitar drenaje del presupuesto.

---

## 6. La mascota como máquina de estados

### 6.1 Principio

La mascota es un **autómata finito** controlado por eventos. No contiene lógica financiera.

```ts
// packages/shared-types/src/events.ts
export type WalletEvent =
  | { type: 'wallet_provisioning'; status: 'CREATING' | 'READY' | 'FAILED' }
  | { type: 'scanner_opened' }
  | { type: 'payment_pending'; txId: string }
  | { type: 'payment_sent'; txId: string; amount: string; asset: string }
  | { type: 'payment_failed'; txId?: string; reason: string }
  | { type: 'qr_requested'; amount?: string; asset?: string }   // usuario quiere cobrar
  | { type: 'payment_received'; txId: string; amount: string; asset: string }
  | { type: 'history_opened' }
  | { type: 'savings_deposit'; amount: string }
  | { type: 'savings_withdraw'; amount: string; early: boolean }
  | { type: 'xp_gained'; amount: number; reason: string }
  | { type: 'level_up'; from: number; to: number }
  | { type: 'idle' };
```

**Invariante I3:** solo `payment_sent`, `payment_received`, `savings_*` y `level_up` pueden mostrar "éxito". Se emiten únicamente cuando Pollar confirma la transacción o cuando el backend confirma el nivel.

### 6.2 Mapa evento → animación

| Evento | Animación de la mascota | Duración sugerida |
|---|---|---|
| `scanner_opened` | Se pone en posición de pago: extiende la mano, ojos hacia la cámara | Mientras el escáner esté abierto |
| `payment_pending` | Sostiene la moneda en el aire, mirando al cielo (spinner) | Hasta confirmación |
| `payment_sent` | **Gesto de pagar**: lanza/entrega la moneda, sonríe, destello amarillo | ~1,5 s |
| `payment_failed` | Se encoge de hombros, la moneda vuelve a su mano | ~1,5 s |
| `qr_requested` | **Saca el QR** (ver §6.3 según nivel) y lo muestra de frente | Mientras el QR esté visible |
| `payment_received` | Atrapa una moneda en el aire, la guarda en la mochila, celebra | ~2 s |
| `history_opened` | Despliega y lee un pergamino/libreta | Mientras esté abierto |
| `savings_deposit` | Mete monedas en la alcancía-vaquita 🐮 | ~2 s |
| `savings_withdraw` (`early: true`) | Expresión de duda al sacar monedas (suave, sin castigo visual agresivo) | ~1,5 s |
| `level_up` | Evolución: cambio de equipo con destello y confeti | ~3 s |
| `idle` | Respiración, parpadeo, cola moviéndose; guiños ocasionales | Loop |

### 6.3 Dónde guarda y saca el QR la mascota (por nivel)

Esto responde directamente a la idea de que "depende del nivel": el contenedor del QR evoluciona con el equipo visible en los mockups.

| Tier | Niveles | Equipo visible | Cómo aparece el QR al **cobrar** |
|---|---|---|---|
| **Cría** | 1–2 | Sin ropa (Nivel 1 "Gecko recién nacido") | Lo sostiene con ambas manos desde atrás, como un cartel pequeño y algo torpe |
| **Aprendiz** | 3–4 | Gorra | Lo saca del **bolsillo** de la gorra/pecho |
| **Explorador** | 5–9 | Hoodie + mochila + gorra (estilo Nivel 7, con el teléfono mostrando un QR en el bolsillo lateral) | Lo saca de la **mochila** y lo despliega |
| **Emperador** | 10 | Corona, capa, trono (Nivel 10 "Emperador millonario") | El gecko **permanece sentado**; un **mayordomo / ave dorada** le trae el QR sobre un cojín y se lo presenta al cliente |

**Al pagar (escanear)**, el gesto también evoluciona: la cría extiende la mano con una monedita; el explorador lanza una moneda con el pulgar; el emperador **chasquea los dedos** y un sirviente entrega la bolsa de monedas.

> Los mockups existentes cubren niveles 1, 7 y 10. Los tiers de arte intermedios (2–6, 8–9) son **propuesta**; ver divergencias en §14.

### 6.4 Implementación técnica recomendada

- **Rive** (state machines) para la mascota: un solo archivo `.riv` por tier con *inputs* nombrados, ligero y apto para móvil. Alternativa: Lottie (menos control de estados).
- Un `MascotController` expone una función pura `reduce(state, event) → { animation, tier }`.
- Prioridad de animaciones: `payment_failed` > `level_up` > `payment_*` > `qr_requested` > `savings_*` > `history_opened` > `idle`. Los eventos de menor prioridad se encolan; nunca se pierde un `level_up`.
- Accesibilidad: respetar "reducir movimiento" del sistema (cambiar a imágenes estáticas con *cross-fade*) y siempre acompañar la animación con texto/haptic, porque **el estado financiero nunca debe depender solo de la animación**.

```ts
// packages/mascot/src/reduce.ts  (puro, sin dependencias de Pollar)
export function tierForLevel(level: number): Tier {
  if (level >= 10) return 'emperador';
  if (level >= 5) return 'explorador';
  if (level >= 3) return 'aprendiz';
  return 'cria';
}
export function reduce(prev: MascotState, ev: WalletEvent, level: number): MascotState { /* ... */ }
```

---

## 7. Motor de XP, niveles y anti-abuso

### 7.1 Fuente de verdad

El XP **solo** lo calcula `apps/api` a partir de eventos observados en la cadena (Horizon/RPC) y de lecturas del contrato de Vaquita. El cliente nunca envía "gané X XP".

### 7.2 Eventos que otorgan XP (valores iniciales, ajustables)

| Acción | XP | Condición anti-abuso |
|---|---|---|
| Completar onboarding (wallet `READY`) | 50 | Una vez por usuario |
| Primer pago enviado | 100 | Una vez |
| Primer cobro recibido | 100 | Una vez |
| Pago enviado | 10 | Contraparte distinta del propio usuario; monto mínimo; tope diario |
| Cobro recibido | 10 | Idem |
| Pago a una contraparte **nueva** | +5 | Máx. 3 por día |
| Depósito en ahorro (Vaquita) | 20 + bonus por monto escalonado | Mínimo de permanencia |
| **Racha de ahorro** (días/semanas consecutivas) | 25/semana | Solo si el depósito sigue vigente |
| Retiro **anticipado** de ahorro | 0 (sin penalización de XP ya ganado) | — |
| Racha de uso diaria | 5/día | Tope semanal |

### 7.3 Niveles

| Nivel | Nombre | XP para avanzar | Requisito extra |
|---|---|---|---|
| 1 | Gecko recién nacido | 100 | — |
| 2 | Gecko curioso *(propuesto)* | 150 | — |
| 3 | Gecko aprendiz *(propuesto)* | 200 | — |
| 4 | Gecko pagador *(propuesto)* | 300 | — |
| 5 | Gecko explorador *(propuesto)* | 400 | — |
| 6 | Gecko viajero *(propuesto)* | 450 | — |
| 7 | Gecko aventurero *(propuesto)* | 500 | — |
| 8 | Gecko ahorrador *(propuesto)* | 1.000 | ≥ 1 depósito vigente en ahorro |
| 9 | Gecko magnate *(propuesto)* | 2.500 | Racha de ahorro ≥ 4 semanas |
| 10 | **Emperador millonario** | — (nivel final) | Racha de ahorro ≥ 12 semanas |

> El mockup del Nivel 7 muestra `350 / 500 XP`, consistente con "avanzar de 7 a 8 cuesta 500". El mockup del Nivel 10 muestra `250.000 / 250.000 XP`; es un **placeholder visual** y no coincide con esta tabla (ver §14). La tabla de arriba es la fuente de verdad hasta que producto decida otra cosa.

### 7.4 Principios anti-abuso (críticos si hay incentivos)

Gamificar dinero invita a la manipulación. Reglas obligatorias:

1. **Sin XP por auto-pagos** ni entre cuentas con el mismo dueño detectable.
2. **Monto mínimo** por operación que genera XP (evita *wash trading* con centavos aprovechando comisiones bajas).
3. **Topes diarios y semanales** por tipo de evento.
4. **Contrapartes distintas** pesan más que repeticiones con la misma.
5. **Nivel ≠ saldo.** Se separa deliberadamente: el nivel depende de hábitos (XP + racha de ahorro), no de cuánto dinero tienes. Así un usuario con poco saldo puede llegar lejos y el nivel no filtra información patrimonial. (El "Bs 250.000+" del mockup del Nivel 10 es solo el saldo del ejemplo.)
6. **Idempotencia**: cada evento on-chain se procesa una sola vez, identificado por `(txHash, opIndex)`.
7. **Auditoría**: tabla `xp_ledger` append-only con razón, regla y versión de reglas.

```sql
-- apps/api/db/schema.sql (extracto)
CREATE TABLE xp_ledger (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID NOT NULL,
  source_ref   TEXT NOT NULL,          -- txHash:opIndex o id de evento Vaquita
  rule_id      TEXT NOT NULL,
  rule_version INT  NOT NULL,
  xp           INT  NOT NULL CHECK (xp >= 0),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, source_ref, rule_id)  -- idempotencia
);
```

---

## 8. Flujos de pago con QR

### 8.1 Estándar usado

Se adopta **SEP-7** (URI `web+stellar:pay?...`) para códigos QR de cobro, porque es el estándar de Stellar para solicitudes de pago interoperables:

```
web+stellar:pay
  ?destination=<G... o M...>
  &amount=12.50
  &asset_code=USDC
  &asset_issuer=<G...>
  &memo=<referencia>
  &memo_type=MEMO_TEXT
```

Reglas de DeOne:

- El QR de cobro incluye **monto opcional**, **activo** y una **referencia** (memo o dirección multiplexada `M...`) para conciliar cada cobro.
- El escáner **valida antes de pagar**: esquema, activo permitido por la app (según Pollar `EnabledAssets`), monto > 0, destino con formato válido y, si hay trustline requerida, que pueda establecerse (patrocinada por Pollar).
- Se muestra una **pantalla de confirmación** (destino resumido, monto, activo, comisión) antes de firmar. La animación **no reemplaza** esta confirmación.

### 8.2 Secuencia: pagar (escanear)

```mermaid
sequenceDiagram
  actor U as Usuario
  participant UI as App
  participant M as Mascota
  participant P as Pollar (core)
  participant S as Stellar

  U->>UI: Abre escáner QR
  UI-->>M: scanner_opened
  M-->>U: Gecko extiende la mano
  U->>UI: Escanea QR (SEP-7)
  UI->>UI: Valida URI y muestra confirmación
  U->>UI: Confirma
  UI->>P: build → sign → submit
  UI-->>M: payment_pending
  P->>S: Envía transacción
  S-->>P: Confirmada
  P-->>UI: Éxito
  UI-->>M: payment_sent
  M-->>U: Gecko lanza la moneda 🪙
  Note over S: Indexador observa la tx → backend otorga XP
```

### 8.3 Secuencia: cobrar (mostrar QR)

```mermaid
sequenceDiagram
  actor V as Vendedor
  participant UI as App
  participant M as Mascota
  participant Q as packages/qr
  actor C as Cliente

  V->>UI: Toca el botón QR → "Cobrar" (monto opcional)
  UI->>Q: Genera URI SEP-7 con referencia única
  UI-->>M: qr_requested
  M-->>V: Gecko saca el QR (bolsillo / mochila / mayordomo según nivel)
  C->>V: Escanea y paga
  Note over UI: Pollar/Horizon notifica el pago entrante
  UI-->>M: payment_received
  M-->>V: Gecko atrapa la moneda y celebra
```

### 8.4 Pagos entrantes

Detección por polling del historial de Pollar (`fetchTxHistory`-equivalente en `@pollar/core`) con *backoff* y/o por el indexador del backend con notificación push. Solo se emite `payment_received` cuando la transacción está confirmada y coincide con la **referencia** del QR vigente.

---

## 9. Integración con Vaquita (ahorro)

### 9.1 Qué es Vaquita (según su documentación pública)

Protocolo de ahorro "save-to-earn" sobre Stellar/Soroban orientado a LATAM: redistribuye el rendimiento de quienes retiran antes hacia quienes mantienen su compromiso, mediante incentivos de teoría de juegos. El repositorio `vaquita-labs/stellar` es un monorepo con frontend (Next.js + React Three Fiber), API Express bajo `/api/v1`, un *deployer* de vaults DeFindex y contratos Soroban (`vaquita-pool`).

### 9.2 Dos vías de integración (decisión recomendada: **híbrida**)

| Vía | Qué hace | Pros | Contras |
|---|---|---|---|
| **A. Pollar Earn** (`earnDeposit/earnWithdraw`) | Depósitos en vaults DeFindex / pools Blend con APY en vivo, desde la misma sesión Pollar | Cero fricción, un solo pipeline de firma | No incluye la mecánica social de Vaquita |
| **B. Contrato `vaquita-pool`** | Mecánica de "vaquita": compromiso, redistribución, racha | Es el diferenciador de comunidad | Requiere invocar contratos Soroban con la firma de la wallet Pollar (verificar soporte; ver §14) |

**Recomendación:** Fase 1 con vía A (ahorro simple y rendimiento); Fase 2 añade vía B para la experiencia "vaquita" completa, integrada con la racha y los niveles 8–10.

### 9.3 Cómo se ve en la mascota

- Depósito → el gecko mete monedas en una **alcancía con forma de vaquita**.
- Racha de semanas → la vaquita crece/engorda visualmente en el entorno del gecko.
- Nivel 10 → el cofre del tesoro del mockup se llena en proporción a la racha (cosmético, **no** proporcional al saldo).

### 9.4 Datos que consume el backend

- Posiciones y eventos desde la API de Vaquita (`/api/v1`) o directamente desde eventos del contrato.
- Cada depósito/retiro se registra con `source_ref` para idempotencia y alimenta XP y rachas (§7).

> **Nota de ingeniería tomada de Vaquita:** su PR #130 corrigió que "Máx" dejaba hasta un centavo bloqueado por redondear lo mostrado en vez de usar la posición completa. DeOne adopta el patrón: la pantalla muestra el saldo legible, pero la operación "Máx" lleva el monto completo (invariante I5).

---

## 10. Seguridad y privacidad

### 10.1 Modelo de amenazas resumido

| Amenaza | Mitigación |
|---|---|
| Robo de token de sesión | Tokens DPoP ligados a clave no extraíble / Keychain (Pollar) |
| Secret keys en el cliente | **Prohibido** (I1). Secret keys de Pollar solo en backend; escaneo de secretos en CI |
| Manipulación de XP desde el cliente | XP decidido solo en backend desde eventos on-chain (I2) |
| *Wash trading* / farmeo de XP | Reglas de §7.4 |
| QR malicioso (destino/activo falsificado) | Validación SEP-7 estricta + pantalla de confirmación + lista de activos permitidos |
| Drenaje del presupuesto de patrocinio | Topes por usuario/día, solo operaciones de bajo riesgo |
| Phishing con la mascota ("tu gecko pide que firmes") | La mascota nunca solicita firmas; toda firma requiere pantalla de confirmación nativa |
| Fuga de saldo por gamificación | Nivel desacoplado del saldo; ojo de ocultar saldo (como en los mockups) |
| Sesiones comprometidas | `listSessions()` / `revokeSession()` / `logoutEverywhere()` expuestos en "Seguridad" |

### 10.2 Privacidad

- Mínimo de datos personales; PII solo en memoria cuando sea posible (`getUserProfile()` en Pollar).
- El leaderboard (si se añade, como en Vaquita) debe ser **opt-in** y mostrar alias, nunca direcciones ni saldos.
- Cumplimiento: ver §14 (KYC y regulación local).

---

## 11. Pantallas y sistema de diseño

Basado en los tres mockups proporcionados.

| Mockup | Nivel | Observaciones de diseño |
|---|---|---|
| Pantalla 1 | 1 – Gecko recién nacido | Saldo `Bs 0,00`; gecko sin equipo en un prado; insignia de estrella con "1". Cuenta mostrada: `9000 0000 001` |
| Pantalla 2 | 7 | Saldo `Bs 10.250,80`; gecko con gorra, hoodie "DeOne" y mochila con teléfono mostrando QR; barra `350 / 500 XP`; saludo "Tu wallet, más divertida" |
| Pantalla 3 | 10 – Emperador millonario | Saldo `Bs 250.000,00+`; gecko en trono con corona, capa, monóculo y bigote; cofre y lingotes; barra de XP completa |

**Navegación inferior (común):** Inicio · Movimientos · **[QR central]** · Servicios · Más.
El botón QR central es la acción principal (abre escáner/cobro) y es el punto donde la mascota realiza el gesto correspondiente.

**Tokens base (extraídos de los mockups, a refinar en Figma):**

| Token | Valor orientativo |
|---|---|
| Verde marca | `#0E7A4F` – `#1FA463` |
| Verde claro / acento | `#8BD43A` |
| Amarillo destello | `#FFD23F` |
| Crema tarjeta | `#F4F1E4` |
| Radio de tarjeta | 24–32 px |
| Tipografía | Sans redondeada geométrica |

**Accesibilidad:** contraste AA en saldo y botones; etiquetas para lectores de pantalla en cada acción; modo "reducir movimiento"; texto siempre redundante con la animación.

---

## 12. Pruebas y calidad

| Capa | Tipo | Herramienta sugerida |
|---|---|---|
| `xp-engine` | Unit + *property-based* (idempotencia, topes, monotonicidad del XP) | Vitest + fast-check |
| `mascot` | Unit del reductor + prueba de prioridad de animaciones | Vitest |
| `qr` | Unit con vectores SEP-7 válidos e inválidos (fuzz de URIs) | Vitest |
| `wallet-core` | Integración contra **testnet** de Stellar con Pollar | Vitest + testnet |
| `api` | Integración con Postgres efímero | Vitest + Testcontainers |
| `mobile` | Componentes + E2E de flujos pagar/cobrar | Jest/RNTL + Maestro/Detox |
| Contratos (fase 2) | Tests Soroban + cobertura | `cargo test` |

**CI mínimo:** lint, typecheck, tests, escaneo de secretos, auditoría de dependencias y *pinning* de versiones de `@pollar/*`. Publicar reporte de cobertura por paquete (patrón usado por Vaquita).

**Criterios de aceptación clave:**

- [ ] Un `payment_sent` falso inyectado en el cliente **no** otorga XP.
- [ ] Un QR con activo no permitido es rechazado antes de firmar.
- [ ] Saldo `null` se renderiza como "no disponible", no `0`.
- [ ] "Máx" no deja polvo (dust) en ahorro.
- [ ] El mismo `txHash` procesado dos veces genera XP una sola vez.
- [ ] Con "reducir movimiento" activo no hay animaciones, pero el estado sigue siendo claro.

---

## 13. Roadmap

| Fase | Contenido | Resultado |
|---|---|---|
| **0 — Fundaciones** | Monorepo, CI, design tokens, `xp-engine` y `mascot` puros, prototipo Rive de niveles 1/7/10 | Base verificable |
| **1 — MVP en testnet** | Login Pollar, wallet, pagar/cobrar por SEP-7, historial, mascota con eventos, XP básico | Demo completa de la idea central |
| **2 — Ahorro** | Pollar Earn (vía A) + rachas + niveles 8–10 | Retención por hábito |
| **3 — Mainnet piloto** | Anchor/rampa para Bs, patrocinio con topes, observabilidad, auditoría de seguridad | Usuarios reales limitados |
| **4 — Vaquita completo** | Vía B (`vaquita-pool`), leaderboard opt-in, temporadas y skins | Diferenciación de comunidad |
| **5 — Ecosistema** | QR interoperable local (evaluar estándar bancario boliviano), comercios, badges no transferibles en Soroban (opcional) | Escala |

---

## 14. Estado de verificación y supuestos

Esta sección existe para que revisores no tengan que adivinar qué está probado y qué es propuesta.

### 14.1 Verificado en fuentes públicas (a la fecha de redacción)

| Afirmación | Fuente |
|---|---|
| Pollar es SDK de auth y transacciones para Stellar (y Solana desde 0.11.0); incluye pagos, historial, swap multi-venue, Earn (DeFindex + Blend), rampas SEP-24, trustlines patrocinadas, tokens DPoP, soporte Expo/RN | [github.com/pollar-xyz/pollar](https://github.com/pollar-xyz/pollar) |
| Pollar recibió SCF #42 y se describe como SDK de onboarding/pagos con smart account (C-address), patrocinio y dashboard | [Stellar Community Fund – Pollar](https://communityfund.stellar.org/project/pollar-nqe) |
| Pollar expone aprovisionamiento de wallet asíncrono (`CREATING/READY/FAILED`) | [PR #58 de Pollar](https://github.com/pollar-xyz/pollar/pull/58) |
| El SDK de Pollar es JS/TS; un paquete Flutter no oficial usa un puente WebView | [pub.dev/pollar_flutter](https://pub.dev/packages/pollar_flutter) |
| Vaquita: ahorro gamificado en Stellar, SCF #42, "Best Integration" en Stellar Week Buenos Aires 2025, contratos abiertos, apoyado en Blend/DeFindex | [vaquita.fi](https://www.vaquita.fi/) |
| Monorepo de Vaquita: Next.js + R3F, API Express `/api/v1`, deployer DeFindex, contratos Soroban `vaquita-pool` | [github.com/vaquita-labs/stellar](https://github.com/vaquita-labs/stellar) |
| Vaquita redistribuye rendimiento de retiros anticipados a ahorradores comprometidos | [Stellar Light – Vaquita](https://stellarlight.xyz/project/vaquita) |

### 14.2 Decisiones abiertas / no verificadas (**requieren confirmación antes de construir**)

| # | Tema | Qué falta |
|---|---|---|
| D1 | **Activo "Bs"** | No encontré evidencia de un stablecoin BOB en Stellar ni de un anchor boliviano en Pollar. Opciones: (a) activo en USDC con *display* convertido a Bs por tipo de cambio, (b) un stablecoin BOB de un emisor/anchor aliado, (c) rampa vía anchor SEP-24. Hasta decidir, el "Bs" es **presentación**. |
| D2 | **Invocar `vaquita-pool` desde Pollar** | El README de Pollar documenta tx build/sign/submit y Earn, pero no confirmé una API genérica para invocar contratos Soroban arbitrarios. Hay que validarlo con el equipo de Pollar o leer `docs/` del repo. |
| D3 | **SEP-7 con direcciones de contrato (C-address)** | Las smart accounts de Pollar usan C-addresses; la compatibilidad de SEP-7 con ese tipo de destino debe probarse. Plan B: dirección clásica G/M para cobros. |
| D4 | **KYC y cumplimiento** | El módulo KYC de Pollar figura como UI preview con backend próximo. La regulación boliviana aplicable a wallets/pagos requiere asesoría legal. No se afirma cumplimiento. |
| D5 | **QR interoperable local** | No se verificó el estándar de QR bancario en Bolivia; se deja en roadmap para investigación. |
| D6 | **Arte de niveles intermedios** | Solo existen mockups de niveles 1, 7 y 10. |

### 14.3 Divergencias entre mockups y este documento

1. **XP del Nivel 10**: el mockup muestra `250.000 / 250.000`; la tabla de §7.3 define un nivel final por requisitos (racha de ahorro), no por 250.000 XP. Decisión de producto pendiente.
2. **Saldo vs. nivel**: los mockups sugieren correlación (0 → 10.250 → 250.000+). Este diseño **los desacopla** a propósito (§7.4, punto 5).
3. **Nombres de niveles 2–6 y 8–9**: propuestos por este documento.
4. **Número de cuenta** `9000 0000 001` (mockup 1): es un identificador de interfaz; no corresponde a una dirección Stellar. Definir su relación con la `G…`/`C…` real.

---

## 15. Riesgos y mitigaciones

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Cambios incompatibles en Pollar (SDK 0.x) | Alta | Medio | Pin exacto, capa `wallet-core` como adaptador único, seguir `UPGRADE.md` |
| Abuso de XP | Media | Alto | §7.4, monitoreo y reglas versionadas |
| Falta de activo BOB / anchor | Alta | Alto | Decisión D1 temprana; empezar con USDC |
| Cumplimiento regulatorio | Media | Alto | Asesoría legal antes de mainnet (D4) |
| Costo de arte/animación | Media | Medio | Tiers reutilizando rig base; Rive |
| Dependencia de Vaquita API/contratos | Media | Medio | Vía A primero; vía B tras validar D2 |
| Usuario confunde animación con confirmación | Media | Alto | Pantalla de confirmación obligatoria y texto redundante |

---

## 16. Glosario y referencias

**SEP-7:** URI para solicitudes de pago en Stellar. **SEP-10:** autenticación por challenge. **SEP-24:** flujo interactivo de depósito/retiro con anchors. **SEP-53:** firma de mensajes para probar propiedad de cuenta. **Soroban:** plataforma de contratos inteligentes de Stellar. **Trustline:** autorización de una cuenta para mantener un activo. **DPoP:** *Demonstrating Proof-of-Possession* (RFC 9449). **Anchor:** entidad que conecta dinero tradicional con Stellar. **C-address:** dirección de contrato/smart account en Soroban. **Blend / DeFindex:** protocolos de préstamo y vaults en Stellar.

**Referencias**

- Pollar SDK: https://github.com/pollar-xyz/pollar · https://pollar.xyz
- Pollar en SCF: https://communityfund.stellar.org/project/pollar-nqe
- Vaquita: https://www.vaquita.fi · https://github.com/vaquita-labs/stellar · https://app.vaquita.fi
- Stellar: https://www.stellar.org

---

*Documento vivo. Cualquier cambio en reglas de XP, eventos de mascota o decisiones D1–D6 debe reflejarse aquí y en `docs/adr/`.*
