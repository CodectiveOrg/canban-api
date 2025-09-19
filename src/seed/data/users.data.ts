import { SeedUserType } from "@/seed/types/seed-user.type";

export const usersData: SeedUserType[] = [
  {
    username: "Admin",
    email: "admin@gmail.com",
    password: "1234",
    picture: null,
  },
  {
    username: "BijanProgrammer",
    email: "bijan@gmail.com",
    password: process.env.BIJAN_PROGRAMMER_PASSWORD ?? "1234",
    picture: null,
  },
] as const;
