import {QueryClient} from '@tanstack/react-query';
import {cache} from 'react';

// Evita crear un nuevo cliente en cada render del server
export const getQueryClient = cache(() => new QueryClient())