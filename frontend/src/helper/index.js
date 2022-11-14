export function getEnv(key = '') {
  return import.meta.env[key] || process.env[key];
}
