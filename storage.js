export function salvar(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function carregar(key) {
  return JSON.parse(localStorage.getItem(key));
}
