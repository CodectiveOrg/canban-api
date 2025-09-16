export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const result: Partial<T> = { ...obj };

  for (const key of keys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}
