export function ingredientHelper(obj, source) {
    var output = [];
    obj.forEach(ingredient => {
        if (source === "local") {
            if (ingredient.amount > 1) {
                ingredient.unit = `${ingredient.unit}s`;
            }
        }
        var elm = "";
        ingredient.unit ?
            elm = `${ingredient.name} (${ingredient.amount} ${ingredient.unit})`
            : elm = `${ingredient.name} (${ingredient.amount})`
        output.push({ value: elm });
    });
    return output;
};