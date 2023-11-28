export interface FluidraProApp {
   icon: string;
   label: string;
   url: string;
   id: string;
}

export const proApps: FluidraProApp[] = [
   {
      id: "fluidra-pro-academy",
      url: 'https://proacademy.fluidra.com/disseny/index.php?lang=es',
      icon: 'book_2',
      label: 'Fluidra PRO Academy'
    },
    {
      id: "pro-zodiac-space",
      url: 'https://auth.zodiac-poolcare.com/cas/login?service=https%3A%2F%2Fpro.zodiac-poolcare.com%2F',
      icon: 'explore',
      label: 'Espacio PRO Zodiac'
    },
    {
      id: "pool-comertial-and-wellness",
      url: 'https://pro.fluidra.com/es_es/piscina-comercial-wellness/',
      icon: 'air',
      label: 'Piscina Comercial & Wellness'
    },
    {
      id: "fluidra-pro-club",
      url: 'https://pro.fluidra.com/club/es_es/',
      icon: 'menu_book',
      label: 'Fluidra PRO Club'
    }
]