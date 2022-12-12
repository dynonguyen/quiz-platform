import io from 'socket.io-client';
import { getEnv } from '~/helper';

export const socket = io(getEnv('VITE_SOCKET_URL'));
