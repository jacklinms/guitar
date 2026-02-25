"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const code = err && typeof err === "object" && "code" in err ? String((err as { code: string }).code) : "";
      const isInvalidKey =
        message.includes("api-key-not-valid") ||
        message.includes("api_key_not_valid") ||
        message.includes("invalid-api-key") ||
        code.includes("api-key-not-valid") ||
        code.includes("invalid-api-key");
      if (isInvalidKey) {
        setAuthError("FIREBASE_NOT_CONFIGURED");
      } else {
        setAuthError(message || "登入失敗，請稍後再試");
      }
    }
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, authError, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
