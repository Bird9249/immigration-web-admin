export function getPaginateStart(page: number, size: number) {
  return (page - 1) * size + 1;
}

export function getPaginateEnd(start: number, pageSize: number, total: number) {
  return Math.min(start + pageSize - 1, total);
}
