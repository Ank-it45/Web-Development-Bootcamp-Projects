import express from "express";

const app = express();
const port = 3000;

//Step 1: Run the solution.js file without looking at the code.
//Step 2: You can go to the recipe.json file to see the full structure of the recipeJSON below.
const recipeJSON =
  '[{"id": "0001","type": "taco","name": "Chicken Taco","price": 2.99,"ingredients": {"protein": {"name": "Chicken","preparation": "Grilled"},  "salsa": {"name": "Tomato Salsa","spiciness": "Medium"},  "toppings": [{"name": "Lettuce",  "quantity": "1 cup",  "ingredients": ["Iceberg Lettuce"]  },      {"name": "Cheese",  "quantity": "1/2 cup",  "ingredients": ["Cheddar Cheese", "Monterey Jack Cheese"]  },      {"name": "Guacamole",  "quantity": "2 tablespoons",  "ingredients": ["Avocado", "Lime Juice", "Salt", "Onion", "Cilantro"]  },      {"name": "Sour Cream",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream"]  }      ]    }  },{"id": "0002","type": "taco","name": "Beef Taco","price": 3.49,"ingredients": {"protein": {"name": "Beef","preparation": "Seasoned and Grilled"},  "salsa": {"name": "Salsa Verde","spiciness": "Hot"},  "toppings": [{"name": "Onions",  "quantity": "1/4 cup",  "ingredients": ["White Onion", "Red Onion"]  },      {"name": "Cilantro",  "quantity": "2 tablespoons",  "ingredients": ["Fresh Cilantro"]  },      {"name": "Queso Fresco",  "quantity": "1/4 cup",  "ingredients": ["Queso Fresco"]  }      ]    }  },{"id": "0003","type": "taco","name": "Fish Taco","price": 4.99,"ingredients": {"protein": {"name": "Fish","preparation": "Battered and Fried"},  "salsa": {"name": "Chipotle Mayo","spiciness": "Mild"},  "toppings": [{"name": "Cabbage Slaw",  "quantity": "1 cup",  "ingredients": [    "Shredded Cabbage",    "Carrot",    "Mayonnaise",    "Lime Juice",    "Salt"          ]  },      {"name": "Pico de Gallo",  "quantity": "1/2 cup",  "ingredients": ["Tomato", "Onion", "Cilantro", "Lime Juice", "Salt"]  },      {"name": "Lime Crema",  "quantity": "2 tablespoons",  "ingredients": ["Sour Cream", "Lime Juice", "Salt"]  }      ]    }  }]';

// ✅ Modern middleware (no body-parser needed)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ✅ Set view engine once
app.set("view engine", "ejs");

let data;
app.get("/", (req, res) => {
  res.render("index",{recipe:data}/*EXPLAIN THIS LITTLE DEEPER*/); // cleaner (no .ejs needed)
});

const recipes = JSON.parse(recipeJSON)
app.post("/recipe", (req, res) => {
  switch(req.body.choice)
  {
    case "chicken":
      data = recipes[0];
      break;

    case "beef":
      data = recipes[1];
      break;

    case "fish":
      data = recipes[2];
      break;
    default:
        break;
  }
 
  res.redirect("/");

  //Step 3: Write your code here to make this behave like the solution website.
  //Step 4: Add code to views/index.ejs to use the recieved recipe object.
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});


// 1. Browser requests "/"
//         ↓
// 2. Express GET route runs
//         ↓
// 3. res.render("index", {recipe: undefined})
//         ↓
// 4. EJS generates basic HTML
//         ↓
// 5. Browser displays buttons only

// -----------------------------------

// 6. User clicks 🐟
//         ↓
// 7. Form sends POST /recipe
//         ↓
// 8. Express receives req.body.choice = "fish"
//         ↓
// 9. data = recipes[2]
//         ↓
// 10. res.redirect("/")
//         ↓
// 11. Browser automatically sends GET /
//         ↓
// 12. Express GET route runs AGAIN
//         ↓
// 13. res.render("index", {recipe:data})
//         ↓
// 14. EJS now receives recipe object
//         ↓
// 15. EJS dynamically generates recipe HTML
//         ↓
// 16. Browser displays Fish Taco page


//So we can say the architecture is like I mean the flow of the program is like when WE are opening the website, then get route is going to start and it's rendering the index page, which is index.ejs. Now index.ejs does not have any recipe or something like that. It only opens the index page. Okay. Which is like basic structure is set in the index. And then we go to post method. After going to post method, when we hit a button in the form like we hit the button fIsh. Okay. Then what it is doing is it's sending the data like recipes[2] it means the data which is stored in the recipes[2] in recipes array is now stored in data variable.Now we are redirected to the page and the get method start again. And now what program does is it renders index page again by requesting the recipe data from the server through the object recipe:data and render it into the index and therefore we are seeing the whole page now completely

// BETTER WAY TO THINK

// Instead of:

// index.ejs does not have recipe

// Think:

// index.ejs is READY to display recipe,
// but initially recipe data is empty/undefined.

// That’s a very important dynamic rendering concept.

// IMPORTANT CORRECTION #2

// You said:

// "render it into the index"

// Slightly more accurate wording:

// Express sends data TO EJS
// EJS generates FINAL HTML
// Browser displays that HTML

// Because:

// EJS itself is not shown in browser