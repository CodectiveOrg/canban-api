import { User } from "@/entities/user";

export type PasswordlessUser = Omit<User, "password">;
