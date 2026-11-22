import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronRight, Eye, EyeOff, Home, LogOut, Plus, QrCode, Star, Wallet, Zap } from "lucide-react";
import { PLAYER_LEVELS, xpForLevel } from "@stellar-game/game-config";
import { shortenAddress } from "@stellar-game/stellar";
import { DeitoSprite, type DeitoAction } from "@/components/DeitoSprite";
import { useAuthStore } from "@/store/authStore";
import { getMe } from "@/wallet/services/auth.service";
import { createWallet, fundWallet, getBalances, getWallets } from "@/wallet/services/wallet.service";
import "./deone-wallet.css";

const skins = [
  { level: 10, image: "royal", name: "Emperador" },
  { level: 7, image: "dandy", name: "Dandi de la wallet" },
  { level: 4, image: "qr", name: "Modo QR activo" },
  { level: 1, image: "baby", name: "Gecko recién nacido" },
] as const;

const format = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 7 });

export function DashboardPage() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { user, clearAuth } = useAuthStore();
  const [hidden, setHidden] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [animation, setAnimation] = useState<{ action: DeitoAction; id: number }>({ action: "idle", id: 0 });
  const lastLevel = useRef<number | undefined>(undefined);

  function play(action: DeitoAction) {
    setAnimation((previous) => ({ action, id: previous.id + 1 }));
  }

  useEffect(() => {
    if (!user) navigate("/login", { replace: true });
  }, [user, navigate]);

  useEffect(() => {
    if (animation.action === "idle") return;
    const timer = window.setTimeout(() => play("idle"), 1700);
    return () => window.clearTimeout(timer);
  }, [animation]);

  const profile = useQuery({ queryKey: ["me"], queryFn: getMe, enabled: !!user });
  const wallets = useQuery({ queryKey: ["wallets"], queryFn: getWallets, enabled: !!user });
  const entries = wallets.data?.data ?? [];
  const primary = entries.find((wallet) => wallet.isDefault) ?? entries[0];
  const balance = useQuery({
    queryKey: ["balances", primary?.id],
    queryFn: () => getBalances(primary!.id),
    enabled: !!primary,
  });
  const profileData = profile.data?.data.profile;
  const level = profileData?.level ?? 1;
  const xp = profileData?.experience ?? 0;
  const goal = xpForLevel(level);
  const maxed = level >= PLAYER_LEVELS.MAX_LEVEL;
  const skin = skins.find((entry) => level >= entry.level) ?? skins[3];
  const native = balance.data?.data.find((asset) => asset.assetType === "native");

  useEffect(() => {
    if (!profileData) return;
    if (lastLevel.current !== undefined && level > lastLevel.current) play("success");
    lastLevel.current = level;
  }, [level, profileData]);

  function begin() {
    setError("");
    setFeedback("");
  }

  function fail(err: Error) {
    setError(err.message);
    play("error");
  }

  const create = useMutation({
    mutationFn: () => createWallet(),
    onMutate: begin,
    onError: fail,
    onSuccess: () => {
      setFeedback("Billetera creada.");
      play("success");
      return client.invalidateQueries({ queryKey: ["wallets"] });
    },
  });

  const fund = useMutation({
    mutationFn: fundWallet,
    onMutate: begin,
    onError: fail,
    onSuccess: async (_, id) => {
      setFeedback("Recibiste XLM de prueba.");
      await Promise.all([
        client.invalidateQueries({ queryKey: ["wallets"] }),
        client.invalidateQueries({ queryKey: ["me"] }),
        client.invalidateQueries({ queryKey: ["balances", id] }),
        client.invalidateQueries({ queryKey: ["transactions", id] }),
      ]);
      play("receive");
    },
  });

  const action = create.isPending || fund.isPending ? "loading" : animation.action;
  const detail = primary ? `/wallets/${primary.id}` : undefined;
  const balanceText = wallets.isPending || (primary && balance.isPending) ? "…"
    : wallets.isError || (primary && balance.isError) ? "No disponible"
    : format.format(Number(native?.balance ?? 0));

  if (!user) return null;

  return (
    <main className="deone-wallet" id="inicio">
      <div className="deone-shell">
        <header className="deone-header">
          <div className="deone-brand" aria-label="DeOne">D<i /></div>
          <div className="deone-greeting">
            <h1>¡Hola, {profile.data?.data.username ?? user.username}!</h1>
            <p>Tu billetera Stellar</p>
          </div>
          <button className="deone-icon" type="button" aria-label="Cerrar sesión" title="Cerrar sesión" onClick={() => {
            clearAuth();
            client.clear();
            navigate("/");
          }}><LogOut size={20} /></button>
        </header>

        <section className="deone-balance" aria-label="Saldo">
          <div className="deone-balance-icon"><Wallet size={32} /></div>
          <div className="deone-amount">
            <p>{primary ? "Saldo de tu billetera principal" : "Saldo disponible"}</p>
            <strong>{hidden ? "••••••" : balanceText} {balanceText !== "No disponible" && <small>XLM</small>}</strong>
            <span>Stellar Testnet</span>
          </div>
          <button className="deone-icon" type="button" aria-label={hidden ? "Mostrar saldo" : "Ocultar saldo"} onClick={() => {
            setHidden((previous) => !previous);
            if (hidden) play("balance");
          }}>{hidden ? <EyeOff size={21} /> : <Eye size={21} />}</button>
        </section>

        <section className={`deone-scene deone-scene--${skin.image}`} data-action={action} aria-label="Progreso de Deito">
          <button type="button" className="deone-art" onClick={() => play("greet")} aria-label="Saludar a Deito">
            <img src={`${import.meta.env.BASE_URL}deito/${skin.image}.jpg`} alt={`Deito, ${skin.name}`} key={skin.image} />
          </button>
          <div className="deone-level"><Star size={21} fill="currentColor" /> Nivel {level}</div>
          <div className="deone-progress">
            <strong>{skin.name}</strong>
            <progress value={maxed ? 1 : Math.min(xp, goal)} max={maxed ? 1 : goal} aria-label="Progreso de nivel" />
            <span>{maxed ? "Nivel máximo" : `${format.format(xp)} / ${format.format(goal)} XP`}</span>
          </div>
          <div className="deone-reaction" key={`${action}-${animation.id}`}>
            <DeitoSprite action={action} />
          </div>
        </section>

        {error && <p className="deone-feedback deone-error" role="alert">{error}</p>}
        {feedback && <p className="deone-feedback" role="status">{feedback}</p>}

        <section id="billeteras" className="deone-list">
          <div className="deone-list-heading">
            <h2>Mis billeteras</h2>
            <button className="deone-primary" type="button" onClick={() => create.mutate()} disabled={create.isPending}>
              <Plus size={17} /> Nueva billetera
            </button>
          </div>
          {wallets.isPending && <p role="status">Cargando billeteras…</p>}
          {wallets.isError && <p role="alert">No pudimos cargar tus billeteras. <button type="button" onClick={() => void wallets.refetch()}>Reintentar</button></p>}
          {wallets.isSuccess && !entries.length && (
            <button className="deone-empty" type="button" onClick={() => create.mutate()} disabled={create.isPending}>
              <Wallet size={22} /> Crear primera billetera
            </button>
          )}
          {entries.map((wallet) => (
            <div className="deone-wallet-row" key={wallet.id}>
              <Link className="deone-wallet-link" to={`/wallets/${wallet.id}`}>
                <Wallet size={20} />
                <span><strong>{wallet.label ?? "Billetera Stellar"}</strong><small>{shortenAddress(wallet.stellarAddress, 6)}</small></span>
                <ChevronRight size={17} />
              </Link>
              <button className="deone-fund" type="button" onClick={() => fund.mutate(wallet.id)} disabled={fund.isPending}>
                <Zap size={16} /> Fondear
              </button>
            </div>
          ))}
        </section>

        <nav className="deone-nav" aria-label="Billetera">
          <a href="#inicio"><Home size={21} /> Inicio</a>
          {detail
            ? <Link className="deone-nav-qr" to={detail} aria-label="Recibir con QR" title="Recibir con QR"><QrCode size={28} /></Link>
            : <button className="deone-nav-qr" type="button" onClick={() => create.mutate()} disabled={create.isPending} aria-label="Crear billetera"><Plus size={28} /></button>}
          <a href="#billeteras"><Wallet size={21} /> Billeteras</a>
        </nav>
      </div>
    </main>
  );
}
