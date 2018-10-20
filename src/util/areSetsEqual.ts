export const areSetsEqual = <T>(a: Set<T>, b: Set<T>) => {
  if (a.size !== b.size) return false;
  for (const aItem of a) {
    if (!b.has(aItem)) return false;
  }
  return true;
};
