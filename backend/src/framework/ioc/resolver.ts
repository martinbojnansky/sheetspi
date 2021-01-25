export const resolver = <TDef extends { [TKey in keyof TDef]: TDef[TKey] }, TKey extends keyof TDef>(definition: TDef) => {
  const resolvers: TDef = <any>{};
  const instances: TDef = <any>{};

  Object.keys(definition).forEach(k => {
    const key = <TKey>k;
    resolvers[key] = <any>(() => {
      if (!instances[key]) {
        instances[key] = <any>(() => definition[key]());
      }
      return instances[key]();
    });
  });

  return resolvers;
};