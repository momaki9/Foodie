import RecipeCard from "../components/RecipeCard";

const data = {
  "recipes": [
    {
      "id": 642093,
      "image": "https://img.spoonacular.com/recipes/642093-556x370.jpg",
      "imageType": "jpg",
      "title": "Easy Slow Cooker Artichoke Garlic Chicken",
      "readyInMinutes": 45,
      "servings": 2,
      "sourceUrl": "https://www.foodista.com/recipe/JCN42K3H/easy-crockpot-artichoke-garlic-chicken",
      "vegetarian": false,
      "vegan": false,
      "glutenFree": false,
      "dairyFree": true,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": false,
      "sustainable": false,
      "lowFodmap": false,
      "weightWatcherSmartPoints": 14,
      "gaps": "no",
      "preparationMinutes": null,
      "cookingMinutes": null,
      "aggregateLikes": 2,
      "healthScore": 44,
      "creditsText": "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      "license": "CC BY 3.0",
      "sourceName": "Foodista",
      "pricePerServing": 509.68,
      "extendedIngredients": [
        {
          "id": 11821,
          "aisle": "Produce",
          "image": "red-pepper.jpg",
          "consistency": "SOLID",
          "name": "bell pepper",
          "nameClean": "bell pepper",
          "original": "1 Red Bell Pepper- diced",
          "originalName": "Red Bell Pepper- diced",
          "amount": 1,
          "unit": "",
          "meta": [
            "diced",
            "red"
          ],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "",
              "unitLong": ""
            },
            "metric": {
              "amount": 1,
              "unitShort": "",
              "unitLong": ""
            }
          }
        },
        {
          "id": 11282,
          "aisle": "Produce",
          "image": "brown-onion.png",
          "consistency": "SOLID",
          "name": "onion",
          "nameClean": "onion",
          "original": "1 Medium Onion- Cut into wedges",
          "originalName": "Medium Onion- Cut into wedges",
          "amount": 1,
          "unit": "",
          "meta": [
            "cut into wedges"
          ],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "",
              "unitLong": ""
            },
            "metric": {
              "amount": 1,
              "unitShort": "",
              "unitLong": ""
            }
          }
        },
        {
          "id": 10211215,
          "aisle": "Produce",
          "image": "garlic.jpg",
          "consistency": "SOLID",
          "name": "garlic cloves",
          "nameClean": "garlic cloves",
          "original": "6 Garlic Cloves, Peeled and smashed",
          "originalName": "Garlic Cloves, Peeled and smashed",
          "amount": 6,
          "unit": "",
          "meta": [
            "peeled",
            "smashed"
          ],
          "measures": {
            "us": {
              "amount": 6,
              "unitShort": "",
              "unitLong": ""
            },
            "metric": {
              "amount": 6,
              "unitShort": "",
              "unitLong": ""
            }
          }
        },
        {
          "id": 2063,
          "aisle": "Produce",
          "image": "rosemary.jpg",
          "consistency": "SOLID",
          "name": "rosemary",
          "nameClean": "rosemary",
          "original": "1 tsp. Fresh Rosemary- minced",
          "originalName": "Fresh Rosemary- minced",
          "amount": 1,
          "unit": "tsp",
          "meta": [
            "fresh",
            "minced"
          ],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            },
            "metric": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            }
          }
        },
        {
          "id": 93660,
          "aisle": "Baking",
          "image": "tapioca-pearls.png",
          "consistency": "SOLID",
          "name": "cooking tapioca",
          "nameClean": "cooking tapioca",
          "original": "1 tsp. Quick Cooking Tapioca",
          "originalName": "Quick Cooking Tapioca",
          "amount": 1,
          "unit": "tsp",
          "meta": [
            "quick"
          ],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            },
            "metric": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            }
          }
        },
        {
          "id": 9156,
          "aisle": "Produce",
          "image": "zest-lemon.jpg",
          "consistency": "SOLID",
          "name": "lemon zest",
          "nameClean": "lemon zest",
          "original": "½ tsp. Lemon Zest",
          "originalName": "Lemon Zest",
          "amount": 0.5,
          "unit": "tsp",
          "meta": [],
          "measures": {
            "us": {
              "amount": 0.5,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            },
            "metric": {
              "amount": 0.5,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            }
          }
        },
        {
          "id": 6984,
          "aisle": "Canned and Jarred",
          "image": "chicken-broth.png",
          "consistency": "LIQUID",
          "name": "chicken broth",
          "nameClean": "chicken broth",
          "original": "¼ Cup Low Sodium Fat-Free Chicken Broth",
          "originalName": "Low Sodium Fat-Free Chicken Broth",
          "amount": 0.25,
          "unit": "Cup",
          "meta": [
            "fat-free",
            "low sodium"
          ],
          "measures": {
            "us": {
              "amount": 0.25,
              "unitShort": "cups",
              "unitLong": "Cups"
            },
            "metric": {
              "amount": 0.25,
              "unitShort": "cups",
              "unitLong": "cups"
            }
          }
        },
        {
          "id": 5096,
          "aisle": "Meat",
          "image": "chicken-thighs.png",
          "consistency": "SOLID",
          "name": "chicken thighs",
          "nameClean": "chicken thighs",
          "original": "1 ½Lbs. Boneless, Skinless Chicken Thighs (I used 4-and had no left overs)",
          "originalName": "Boneless, Skinless Chicken Thighs (I used 4-and had no left overs)",
          "amount": 1.5,
          "unit": "Lbs",
          "meta": [
            "boneless",
            "skinless",
            "(I used 4-and had no left overs)"
          ],
          "measures": {
            "us": {
              "amount": 1.5,
              "unitShort": "lb",
              "unitLong": "Lbs"
            },
            "metric": {
              "amount": 1.5,
              "unitShort": "lb",
              "unitLong": "pounds"
            }
          }
        },
        {
          "id": 99242,
          "aisle": "Produce",
          "image": "artichoke-hearts.png",
          "consistency": "SOLID",
          "name": "cut artichoke hearts",
          "nameClean": "cut artichoke hearts",
          "original": "1 14 oz Can Cut Artichoke Hearts- Drained",
          "originalName": "Cut Artichoke Hearts- Drained",
          "amount": 14,
          "unit": "oz",
          "meta": [
            "drained"
          ],
          "measures": {
            "us": {
              "amount": 14,
              "unitShort": "oz",
              "unitLong": "ounces"
            },
            "metric": {
              "amount": 396.893,
              "unitShort": "g",
              "unitLong": "grams"
            }
          }
        },
        {
          "id": 9152,
          "aisle": "Produce",
          "image": "lemon-juice.jpg",
          "consistency": "LIQUID",
          "name": "lemon juice",
          "nameClean": "lemon juice",
          "original": "1 tsp. Fresh Lemon Juice",
          "originalName": "Fresh Lemon Juice",
          "amount": 1,
          "unit": "tsp",
          "meta": [
            "fresh"
          ],
          "measures": {
            "us": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            },
            "metric": {
              "amount": 1,
              "unitShort": "tsp",
              "unitLong": "teaspoon"
            }
          }
        },
        {
          "id": 1102047,
          "aisle": "Spices and Seasonings",
          "image": "salt-and-pepper.jpg",
          "consistency": "SOLID",
          "name": "salt & pepper",
          "nameClean": "salt & pepper",
          "original": "Salt & Pepper to taste",
          "originalName": "Salt & Pepper to taste",
          "amount": 2,
          "unit": "servings",
          "meta": [
            "to taste"
          ],
          "measures": {
            "us": {
              "amount": 2,
              "unitShort": "servings",
              "unitLong": "servings"
            },
            "metric": {
              "amount": 2,
              "unitShort": "servings",
              "unitLong": "servings"
            }
          }
        },
        {
          "id": 11220420,
          "aisle": "Pasta and Rice",
          "image": "rigatoni.jpg",
          "consistency": "SOLID",
          "name": "rigatoni pasta",
          "nameClean": "rigatoni pasta",
          "original": "2 servings Rigatoni Pasta",
          "originalName": "Rigatoni Pasta",
          "amount": 2,
          "unit": "servings",
          "meta": [],
          "measures": {
            "us": {
              "amount": 2,
              "unitShort": "servings",
              "unitLong": "servings"
            },
            "metric": {
              "amount": 2,
              "unitShort": "servings",
              "unitLong": "servings"
            }
          }
        }
      ],
      "summary": "If you have around \u003Cb\u003E45 minutes\u003C/b\u003E to spend in the kitchen, Easy Slow Cooker Artichoke Garlic Chicken might be a tremendous \u003Cb\u003Edairy free\u003C/b\u003E recipe to try. This main course has \u003Cb\u003E718 calories\u003C/b\u003E, \u003Cb\u003E76g of protein\u003C/b\u003E, and \u003Cb\u003E15g of fat\u003C/b\u003E per serving. For \u003Cb\u003E$5.1 per serving\u003C/b\u003E, this recipe \u003Cb\u003Ecovers 42%\u003C/b\u003E of your daily requirements of vitamins and minerals. This recipe serves 2. This recipe from Foodista requires chicken broth, lemon zest, salt & pepper, and rosemary. Not a lot of people made this recipe, and 2 would say it hit the spot. Overall, this recipe earns a \u003Cb\u003Egood spoonacular score of 79%\u003C/b\u003E. If you like this recipe, you might also like recipes such as \u003Ca href=\"https://spoonacular.com/recipes/easy-slow-cooker-artichoke-garlic-chicken-1369311\"\u003EEasy Slow Cooker Artichoke Garlic Chicken\u003C/a\u003E, \u003Ca href=\"https://spoonacular.com/recipes/slow-cooker-spinach-and-artichoke-chicken-1448129\"\u003ESlow Cooker Spinach and Artichoke Chicken\u003C/a\u003E, and \u003Ca href=\"https://spoonacular.com/recipes/lemon-artichoke-slow-cooker-chicken-550756\"\u003ELemon & Artichoke Slow Cooker Chicken\u003C/a\u003E.",
      "cuisines": [],
      "dishTypes": [
        "lunch",
        "main course",
        "main dish",
        "dinner"
      ],
      "diets": [
        "dairy free"
      ],
      "occasions": [],
      "instructions": "Chop, mince and dice all veggies & spices.\n Combine bell pepper, onion, garlic, tapioca, rosemary, lemon zest, artichokes, chicken thighs, salt and pepper in crockpot.\n Pour broth and lemon juice over mixture.\n Cover and cook on low for 5 hours- You really dont need to check on this but every once and a while maybe give it a little stir.\n Once chicken is cooked through, cook pasta.\n Serve over pasta top with fresh shaved parmesan\n ENJOY!!!",
      "analyzedInstructions": [
        {
          "name": "",
          "steps": [
            {
              "number": 1,
              "step": "Chop, mince and dice all veggies & spices.",
              "ingredients": [
                {
                  "id": 2035,
                  "name": "spices",
                  "localizedName": "spices",
                  "image": "spices.png"
                },
                {
                  "id": 0,
                  "name": "ground meat",
                  "localizedName": "ground meat",
                  "image": "fresh-ground-beef.jpg"
                }
              ],
              "equipment": []
            },
            {
              "number": 2,
              "step": "Combine bell pepper, onion, garlic, tapioca, rosemary, lemon zest, artichokes, chicken thighs, salt and pepper in crockpot.",
              "ingredients": [
                {
                  "id": 1102047,
                  "name": "salt and pepper",
                  "localizedName": "salt and pepper",
                  "image": "salt-and-pepper.jpg"
                },
                {
                  "id": 5091,
                  "name": "chicken thighs",
                  "localizedName": "chicken thighs",
                  "image": "chicken-thigh.jpg"
                },
                {
                  "id": 10211821,
                  "name": "bell pepper",
                  "localizedName": "bell pepper",
                  "image": "bell-pepper-orange.png"
                },
                {
                  "id": 11007,
                  "name": "artichoke",
                  "localizedName": "artichoke",
                  "image": "artichokes.png"
                },
                {
                  "id": 9156,
                  "name": "lemon zest",
                  "localizedName": "lemon zest",
                  "image": "zest-lemon.jpg"
                },
                {
                  "id": 2036,
                  "name": "rosemary",
                  "localizedName": "rosemary",
                  "image": "rosemary.jpg"
                },
                {
                  "id": 20068,
                  "name": "tapioca",
                  "localizedName": "tapioca",
                  "image": "sago-pearls.png"
                },
                {
                  "id": 11215,
                  "name": "garlic",
                  "localizedName": "garlic",
                  "image": "garlic.png"
                },
                {
                  "id": 11282,
                  "name": "onion",
                  "localizedName": "onion",
                  "image": "brown-onion.png"
                }
              ],
              "equipment": [
                {
                  "id": 404718,
                  "name": "slow cooker",
                  "localizedName": "slow cooker",
                  "image": "https://spoonacular.com/cdn/equipment_100x100/slow-cooker.jpg"
                }
              ]
            },
            {
              "number": 3,
              "step": "Pour broth and lemon juice over mixture.",
              "ingredients": [
                {
                  "id": 9152,
                  "name": "lemon juice",
                  "localizedName": "lemon juice",
                  "image": "lemon-juice.jpg"
                },
                {
                  "id": 1006615,
                  "name": "broth",
                  "localizedName": "broth",
                  "image": "chicken-broth.png"
                }
              ],
              "equipment": []
            },
            {
              "number": 4,
              "step": "Cover and cook on low for 5 hours- You really dont need to check on this but every once and a while maybe give it a little stir.",
              "ingredients": [],
              "equipment": [],
              "length": {
                "number": 300,
                "unit": "minutes"
              }
            },
            {
              "number": 5,
              "step": "Once chicken is cooked through, cook pasta.",
              "ingredients": [
                {
                  "id": 0,
                  "name": "chicken",
                  "localizedName": "chicken",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/whole-chicken.jpg"
                },
                {
                  "id": 20420,
                  "name": "pasta",
                  "localizedName": "pasta",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
                }
              ],
              "equipment": []
            },
            {
              "number": 6,
              "step": "Serve over pasta top with fresh shaved parmesan",
              "ingredients": [
                {
                  "id": 1033,
                  "name": "parmesan",
                  "localizedName": "parmesan",
                  "image": "parmesan.jpg"
                },
                {
                  "id": 20420,
                  "name": "pasta",
                  "localizedName": "pasta",
                  "image": "https://spoonacular.com/cdn/ingredients_100x100/fusilli.jpg"
                }
              ],
              "equipment": []
            },
            {
              "number": 7,
              "step": "ENJOY!!!",
              "ingredients": [],
              "equipment": []
            }
          ]
        }
      ],
      "language": "en",
      "originalId": null,
      "spoonacularScore": 83.0058670043945,
      "spoonacularSourceUrl": "https://spoonacular.com/easy-slow-cooker-artichoke-garlic-chicken-642093"
    }
  ]
}

// id, imgLink, title, name, score, likes
// recipes.id, .image, .title, .sourceName, .spoonacularScore, .aggregateLikes
const ExplorePage = () => {
    return (
        <section>
        <h1 className="text-center mb-4">Coming soon...</h1>
        <RecipeCard 
            id={data.recipes[0].id}
            imgLink={data.recipes[0].image}
            title={data.recipes[0].title}
            name={data.recipes[0].sourceName}
            score={data.recipes[0].spoonacularScore}
            likes={data.recipes[0].aggregateLikes}
        />
        </section>
    )
}

export default ExplorePage;