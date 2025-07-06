import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types/user.type';

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isOrganizer: () => boolean;
  isOwner: (userId: number) => boolean;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      isOrganizer: () => get().user?.organizer === true,
      isOwner: (userId) => get().user?.id === userId,
    }),
    {
      name: 'auth',
    }
  )
);
