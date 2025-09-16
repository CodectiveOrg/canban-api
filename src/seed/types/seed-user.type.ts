import { User } from "@/entities/user";

export type SeedUserType = Omit<User, "id" | "createdAt" | "updatedAt">;
