const actionTypeCache: { [actionType: string]: boolean } = {};

export function actionType(actionTypeName: string) {
  if (actionTypeCache[actionTypeName]) {
    throw new Error(`Action type name: ${actionTypeName} is already registered!`);
  }
  actionTypeCache[actionTypeName] = true;
  return actionTypeName;
}
