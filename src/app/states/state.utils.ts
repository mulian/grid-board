/**
 * It takes the actionType and returns given string with pre string of actions type: "[{actionsType}] str"
 * @param actionsType the type of actions
 * @return a function with to create the action String
 */
export function actionStringCreator(actionsType: string) {
    return (str: string) => `[${actionsType}] ${str}`
}
