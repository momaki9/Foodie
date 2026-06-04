export function ingredientHelper(obj, source) {
    var output = [];
    obj.forEach(ingredient => {
        let unit = ingredient.unit;
        if (source === "local" && ingredient.amount > 1) {
            unit = `${unit}s`;
        }
        var elm = unit
            ? `${ingredient.name} (${ingredient.amount} ${unit})`
            : `${ingredient.name} (${ingredient.amount})`
        output.push({ value: elm });
    });
    return output;
};