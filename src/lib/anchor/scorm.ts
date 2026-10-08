const STORAGE_KEY = "hws-scorm-1.2";

type Api = {
  LMSInitialize: (arg: string) => string;
  LMSFinish: (arg: string) => string;
  LMSGetValue: (key: string) => string;
  LMSSetValue: (key: string, value: string) => string;
  LMSCommit: (arg: string) => string;
  LMSGetLastError: () => string;
  LMSGetErrorString: (code: string) => string;
  LMSGetDiagnostic: (code: string) => string;
  __hwsShim?: boolean;
};

export type ScormLog = { call: string; detail: string };

export type ScormHandle = {
  mode: "lms" | "preview";
  getValue: (key: string) => string;
  setValue: (key: string, value: string) => boolean;
  commit: () => boolean;
  finish: () => boolean;
  rows: () => { key: string; value: string }[];
  log: ScormLog[];
};

const WRITABLE = new Set([
  "cmi.core.lesson_location",
  "cmi.core.lesson_status",
  "cmi.core.score.raw",
  "cmi.core.score.min",
  "cmi.core.score.max",
  "cmi.core.exit",
  "cmi.core.session_time",
  "cmi.suspend_data",
]);

const ERRORS: Record<string, string> = {
  "0": "No error",
  "101": "General exception",
  "201": "Invalid argument error",
  "301": "Not initialized",
  "403": "Element is read only",
  "405": "Incorrect data type",
};

const ROW_KEYS = [
  "cmi.core.student_name",
  "cmi.core.student_id",
  "cmi.core.lesson_status",
  "cmi.core.score.raw",
  "cmi.core.score.min",
  "cmi.core.score.max",
  "cmi.core.lesson_location",
  "cmi.core.session_time",
  "cmi.core.exit",
  "cmi.core.entry",
  "cmi.core.lesson_mode",
  "cmi.core.credit",
  "cmi.suspend_data",
];

function findApi(win: Window): Api | null {
  const seen = new Set<Window>();
  let current: Window | null = win;
  for (let hop = 0; hop < 8 && current && !seen.has(current); hop++) {
    seen.add(current);
    const candidate = (current as Window & { API?: Api }).API;
    if (candidate && typeof candidate.LMSInitialize === "function" && !candidate.__hwsShim) return candidate;
    if (current.parent && current.parent !== current) current = current.parent;
    else break;
  }
  const opener = win.opener as (Window & { API?: Api }) | null;
  if (opener && typeof opener.API?.LMSInitialize === "function" && !opener.API.__hwsShim) return opener.API;
  return null;
}

function formatSession(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${String(hours).padStart(4, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.00`;
}

function readStore(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function installShim(): Api {
  const existing = (window as Window & { API?: Api }).API;
  if (existing?.__hwsShim) return existing;
  let store = readStore();
  let error = "0";
  let initialized = false;
  const api: Api = {
    __hwsShim: true,
    LMSInitialize: () => {
      store = readStore();
      initialized = true;
      error = "0";
      if (!store["cmi.core.lesson_status"]) {
        store["cmi.core.entry"] = "ab-initio";
        store["cmi.core.lesson_status"] = "not attempted";
      } else {
        store["cmi.core.entry"] = store["cmi.suspend_data"] ? "resume" : "ab-initio";
      }
      store["cmi.core.student_name"] = store["cmi.core.student_name"] || "Preview Learner";
      store["cmi.core.student_id"] = store["cmi.core.student_id"] || "preview";
      store["cmi.core.lesson_mode"] = "normal";
      store["cmi.core.credit"] = "credit";
      store["cmi.core.score.min"] = store["cmi.core.score.min"] || "0";
      store["cmi.core.score.max"] = store["cmi.core.score.max"] || "100";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return "true";
    },
    LMSFinish: () => {
      if (!initialized) {
        error = "301";
        return "false";
      }
      initialized = false;
      error = "0";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      return "true";
    },
    LMSGetValue: (key) => {
      if (!initialized) {
        error = "301";
        return "";
      }
      error = "0";
      return store[key] ?? "";
    },
    LMSSetValue: (key, value) => {
      if (!initialized) {
        error = "301";
        return "false";
      }
      if (!WRITABLE.has(key)) {
        error = "403";
        return "false";
      }
      if (key === "cmi.suspend_data" && value.length > 4096) {
        error = "405";
        return "false";
      }
      const statuses = new Set(["passed", "completed", "failed", "incomplete", "browsed", "not attempted"]);
      if (key === "cmi.core.lesson_status" && !statuses.has(value)) {
        error = "405";
        return "false";
      }
      store[key] = value;
      error = "0";
      return "true";
    },
    LMSCommit: () => {
      if (!initialized) {
        error = "301";
        return "false";
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      error = "0";
      return "true";
    },
    LMSGetLastError: () => error,
    LMSGetErrorString: (code) => ERRORS[code] ?? "Unknown error",
    LMSGetDiagnostic: (code) => ERRORS[code] ?? error,
  };
  (window as Window & { API?: Api }).API = api;
  return api;
}

export function openScorm(): ScormHandle {
  const started = Date.now();
  const lms = findApi(window);
  const api = lms ?? installShim();
  const log: ScormLog[] = [];
  const note = (call: string, detail: string) => {
    log.unshift({ call, detail });
    if (log.length > 12) log.pop();
  };
  const init = api.LMSInitialize("");
  note("LMSInitialize", String(init));
  if (api.LMSGetValue("cmi.core.lesson_status") === "not attempted" || api.LMSGetValue("cmi.core.lesson_status") === "") {
    api.LMSSetValue("cmi.core.lesson_status", "incomplete");
    note("LMSSetValue", "cmi.core.lesson_status = incomplete");
  }
  api.LMSSetValue("cmi.core.score.min", "0");
  api.LMSSetValue("cmi.core.score.max", "100");
  api.LMSSetValue("cmi.core.exit", "suspend");
  api.LMSCommit("");
  note("LMSCommit", "bookmark armed");

  return {
    mode: lms ? "lms" : "preview",
    log,
    getValue: (key) => api.LMSGetValue(key) ?? "",
    setValue: (key, value) => {
      const ok = api.LMSSetValue(key, value) === "true";
      note("LMSSetValue", ok ? `${key} = ${value.slice(0, 80)}` : `${key} rejected ${api.LMSGetLastError()}`);
      return ok;
    },
    commit: () => {
      api.LMSSetValue("cmi.core.session_time", formatSession(Date.now() - started));
      const ok = api.LMSCommit("") === "true";
      note("LMSCommit", ok ? "ok" : api.LMSGetLastError());
      return ok;
    },
    finish: () => {
      api.LMSSetValue("cmi.core.session_time", formatSession(Date.now() - started));
      api.LMSSetValue("cmi.core.exit", "suspend");
      api.LMSCommit("");
      const ok = api.LMSFinish("") === "true";
      note("LMSFinish", ok ? "ok" : api.LMSGetLastError());
      return ok;
    },
    rows: () => ROW_KEYS.map((key) => ({ key, value: api.LMSGetValue(key) ?? "" })),
  };
}

export type Suspend = {
  step: number;
  answers: (number | null)[];
  deployCleared: boolean;
  bestScore: number | null;
};

export function readSuspend(raw: string, questionCount: number): Suspend {
  const empty: Suspend = { step: 0, answers: Array(questionCount).fill(null), deployCleared: false, bestScore: null };
  if (!raw) return empty;
  try {
    const parsed = JSON.parse(raw) as Partial<Suspend>;
    const answers = Array.from({ length: questionCount }, (_, index) => {
      const value = parsed.answers?.[index];
      return typeof value === "number" && Number.isInteger(value) ? value : null;
    });
    return {
      step: typeof parsed.step === "number" ? parsed.step : 0,
      answers,
      deployCleared: parsed.deployCleared === true,
      bestScore: typeof parsed.bestScore === "number" ? parsed.bestScore : null,
    };
  } catch {
    return empty;
  }
}
