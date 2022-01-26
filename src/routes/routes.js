export const publicRoutes = [
  {
    to: "/login",
    children: "Iniciar Sesión",
  },
];

export const privateRoutes = [
  {
    to: "/clientes",
    children: "Clientes",
  },
  {
    to: "/pagos",
    children: "Pagos",
  },
  {
    to: "/ajustes",
    children: "Ajustes",
  },
  {
    to: "/proyecciones",
    children: "Proyecciones",
  },
  {
    to: "/mantenimiento",
    children: "Mantenimiento",
  },
];
