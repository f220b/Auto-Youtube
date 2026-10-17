// Theme: follows the system until toggled; choice kept in localStorage (sync read, so no flash).
const dark = document.getElementById("dark");
const setTheme = (isDark) => {
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.classList.toggle("light", !isDark);
  dark.checked = isDark;
};
let saved = null;
try { saved = localStorage.getItem("theme"); } catch {}
setTheme(saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches);
dark.addEventListener("change", () => {
  setTheme(dark.checked);
  try { localStorage.setItem("theme", dark.checked ? "dark" : "light"); } catch {}
});

const quality = document.getElementById("quality");
const autopause = document.getElementById("autopause");

chrome.storage.local.get({ quality: "hd1080", autopause: false }).then((s) => {
  quality.value = s.quality;
  autopause.checked = s.autopause;
  // Enable transitions only after initial state is set, so nothing animates on open.
  requestAnimationFrame(() => document.documentElement.classList.add("ready"));
});

const save = () => chrome.storage.local.set({ quality: quality.value, autopause: autopause.checked });
quality.addEventListener("change", save);
autopause.addEventListener("change", save);
