import React, { useState, type FormEvent } from "react";
import styles from "./styles.module.css";

// Configure these after Listmonk setup (see infra/SETUP.md)
// Example: "https://mail.tombedor.dev"
const LISTMONK_URL = "";
// Example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
const LISTMONK_LIST_UUID = "";

export default function EmailSignup(): React.ReactElement | null {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  if (!LISTMONK_URL || !LISTMONK_LIST_UUID) {
    return null; // Don't render until configured
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${LISTMONK_URL}/api/public/subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: "",
          list_uuids: [LISTMONK_LIST_UUID],
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("Check your email to confirm your subscription.");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setMessage(data?.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className={styles.signup}>
      <h3>Subscribe for updates</h3>
      <p>Get new posts delivered to your inbox.</p>
      {status === "success" ? (
        <p className={styles.success}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className={styles.input}
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
          {status === "error" && <p className={styles.error}>{message}</p>}
        </form>
      )}
    </div>
  );
}
