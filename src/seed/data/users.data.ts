import { SeedUserType } from "@/seed/types/seed-user.type";

export const usersData: SeedUserType[] = [
  {
    username: "BijanProgrammer",
    email: "bijan@gmail.com",
    password: "1234",
    picture: null,
  },
  {
    username: "Admin",
    email: "admin@gmail.com",
    password: "1234",
    picture: null,
  },
  {
    username: "Guest",
    email: "guest@gmail.com",
    password: "1234",
    picture: null,
  },
  {
    username: "Test",
    email: "test@gmail.com",
    password: "1234",
    picture: null,
  },
] as const;
