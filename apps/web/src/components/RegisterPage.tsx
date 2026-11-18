import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wallet } from "lucide-react";
import { register as registerUser } from "@/wallet/services/auth.service";
import { useAuthStore } from "@/store/authStore";

const registerSchema = z
  .object({
    email: z.string().email("Email invalido"),
    username: z.string().min(3, "Minimo 3 caracteres").max(30, "Maximo 30 caracteres"),
    password: z.string().min(8, "Minimo 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contrasenas no coinciden",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterData) {
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(data.email, data.username, data.password);
      setAuth(res.token, {
        id: res.user.id,
        email: res.user.email,
        username: res.user.username,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-game-primary to-game-secondary p-4">
      <div className="w-full max-w-md rounded-xl border border-game-accent bg-game-secondary/80 p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Wallet className="h-12 w-12 text-game-gold mb-3" />
          <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
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
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              {...register("username")}
              className="w-full rounded-lg border border-game-accent bg-game-primary px-4 py-2 text-white focus:border-game-highlight focus:outline-none"
            />
            {errors.username && (
              <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>
            )}
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

          <div>
            <label className="block text-sm text-gray-400 mb-1">Confirmar Contrasena</label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full rounded-lg border border-game-accent bg-game-primary px-4 py-2 text-white focus:border-game-highlight focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-game-highlight px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Ya tienes cuenta?{" "}
          <Link to="/login" className="text-game-gold hover:underline">
            Iniciar sesion
          </Link>
        </p>
      </div>
    </main>
  );
}
