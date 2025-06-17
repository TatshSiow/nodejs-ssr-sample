tailwind.config = {
  content: ["./**/*.html"],
  darkMode: "class"
};

// Immediately invoked function to set correct initial theme without flash
(function () {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  html.classList.toggle('dark', initialTheme === 'dark');
  localStorage.setItem('theme', initialTheme);
})();

// Apply correct theme and button text once DOM is ready
function applySavedTheme() {
  const theme = localStorage.getItem('theme');
  const html = document.documentElement;
  const button = document.getElementById('themeToggleBtn');

  html.classList.toggle('dark', theme === 'dark');

  if (button) {
    button.innerText = theme === 'dark' ? '☀️' : '🌙';
  }
}

document.addEventListener('DOMContentLoaded', applySavedTheme);

// Toggle handler
function toggleDarkMode() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  const button = document.getElementById('themeToggleBtn');
  button.innerText = isDark ? '☀️' : '🌙';
}