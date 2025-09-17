import { CanbanDataSource } from "@/database/canban.data-source";

declare global {
  // extend the globalThis type
  var dataSource: CanbanDataSource;
}

export {};
