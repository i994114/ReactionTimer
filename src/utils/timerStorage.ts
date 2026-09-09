import type { Timer } from "../types/timer";

function isTimer(value: unknown): value is Timer {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const timer = value as Record<string, unknown>;
  
  return (
    typeof timer.id === "string" &&
    typeof timer.name === "string" &&
    typeof timer.randomMin === "number" &&
    typeof timer.randomMax === "number" &&
    typeof timer.trainingTime === "number" &&
    typeof timer.interval === "number" &&
    typeof timer.rounds === "number"
  );
}

/* ローカルストレージに保存しているタイマー一覧を呼び出し */
export function loadTimers(fallback: Timer[]): Timer[] {
  const savedTimers = localStorage.getItem("timers");

  if (!savedTimers) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(savedTimers);

    if (Array.isArray(parsed) && parsed.every(isTimer)) {
      return parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }

}

/* 単品のタイマー情報呼び出し */
export function loadTimer(id: string): Timer | undefined {
  const timers = loadTimers([]);
  return timers.find((timer) => timer.id === id);
}

/* ローカルストレージにタイマー情報を保存 */
export function saveTimers(timers: Timer[]): void {
  localStorage.setItem('timers', JSON.stringify(timers));
}

/* 特定のタイマーを削除 */
export function deleteTimer(id: string) {
  const timers = loadTimers([]);
  const updatedTimers = timers.filter((timer) => timer.id !== id);
  saveTimers(updatedTimers);

  return updatedTimers;
}