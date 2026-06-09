const featuredCategories = [
    {
        key: "healthiness",
        title: "Healthy Picks",
        params: "sort=healthiness"
    },
    {
        key: "popularity",
        title: "Popular Recipes",
        params: "sort=popularity"
    },
    {
        key: "high-protein",
        title: "High Protein",
        params: "minProtein=20"
    },
    {
        key: "low-carb",
        title: "Low Carb",
        params: "maxCarbs=15"
    },
    {
        key: "quick-meals",
        title: "Quick Meals",
        params: "maxReadyTime=30"
    }
];

const getFeaturedCategory = () => {

    const dayNumber = Math.floor(Date.now() / 86400000);

    return featuredCategories[
        dayNumber % featuredCategories.length
    ];
};

module.exports = {
    getFeaturedCategory
};