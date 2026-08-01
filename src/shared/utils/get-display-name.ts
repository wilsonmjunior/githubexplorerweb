export function getDisplayName(
  entity: { name: string | null; login: string },
): string {
  return entity.name ?? entity.login
}
