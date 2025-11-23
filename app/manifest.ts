import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tushar Mittal Portfolio',
    short_name: 'Tushar Mittal',
    description: 'Full Stack Developer Portfolio of Tushar Mittal',
    start_url: '/',
    display: 'standalone',
    background_color: '#030014',
    theme_color: '#7042f8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

