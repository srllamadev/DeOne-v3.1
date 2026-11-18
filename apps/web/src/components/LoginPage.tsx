import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wallet } from "lucide-react";
import { login } from "@/wallet/services/auth.service";
import { useAuthStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.string().email("Email invalido"),
  password: z.string().min(1, "La contrasena es requerida"),
});

type LoginData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    setLoading(true);
    setError("");

    try {
      const res = await login(data.email, data.password);
      setAuth(res.token, {
        id: res.user.id,
        email: res.user.email,
        username: res.user.username,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="w-full max-w-md rounded-xl border border-game-accent bg-game-secondary/80 p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Wallet className="h-12 w-12 text-game-gold mb-3" />
          <h1 className="text-2xl font-bold text-white">Iniciar Sesion</h1>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/50 border border-red-700 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-game-accent bg-game-primary px-4 py-2 text-white focus:border-game-highlight focus:outline-none"
            />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Contrasena</label>
            <input
              {...register("password")}
              type="password"
              className="w-full rounded-lg border border-game-accent bg-game-primary px-4 py-2 text-white focus:border-game-highlight focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-game-highlight px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          No tienes cuenta?{" "}
          <Link to="/register" className="text-game-gold hover:underline">
            Registrarse
          </Link>
        </p>
      </div>
    </main>
  );
}
