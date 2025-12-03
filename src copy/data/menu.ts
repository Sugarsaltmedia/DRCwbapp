import { MenuItem } from '../types';

export const menuData: MenuItem[] = [ // Added example image URLs for some items
  // POPCORN TIME
  {
    id: 'popcorn-regular',
    name: 'Regular Tub',
    category: 'POPCORN TIME',
    price: 130,
    maxPrice: 200,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-butter',
    name: 'Butter',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-cheese',
    name: 'Cheese',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-tomato-chilli',
    name: 'Tomato Chilli',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-barbeque',
    name: 'Barbeque (Spicy)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-onion',
    name: 'Onion (Creamy)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-peri-peri',
    name: 'Peri Peri (Smoky)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-mexican',
    name: 'Mexican',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-schezwan',
    name: 'Schezwan',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-my-mix',
    name: 'My Mix',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },
  {
    id: 'popcorn-butter-mix',
    name: 'My Butter Flavour Mix',
    category: 'POPCORN TIME',
    price: 170,
    maxPrice: 340,
    sizes: ['Small', 'Large'],
    hasVariants: true, // Example image URL
    image: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG'
  },

  // SODAS & SIPS
  {
    id: 'coke-fanta-sprite',
    name: 'Coke/Fanta/Sprite',
    category: 'SODAS & SIPS',
    price: 120,
    description: 'Served without ice', // Example image URL
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg'
  },
  {
    id: 'lemon-ice-tea',
    name: 'Lemon Ice Tea',
    category: 'SODAS & SIPS',
    price: 100,
    description: 'Served without ice',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg'
  },
  {
    id: 'paper-boat',
    name: 'Paper Boat',
    category: 'SODAS & SIPS',
    price: 50,
    description: 'MRP',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg'
  },

  // CRUNCHY BITES
  {
    id: 'nachos',
    name: 'Nachos W/Dip',
    category: 'CRUNCHY BITES',
    price: 150,
    maxPrice: 160, // Example image URL
    image: 'https://i.pinimg.com/736x/30/23/c6/3023c60e4804710b5a638e478c9cdfb1.jpg'
  },
  {
    id: 'pizza-cheese',
    name: 'Pizza Cheese W/Dip',
    category: 'CRUNCHY BITES',
    price: 120, // Example image URL
    image: 'https://i.pinimg.com/736x/30/23/c6/3023c60e4804710b5a638e478c9cdfb1.jpg'
  },
  {
    id: 'spring-rolls',
    name: 'Spring Rolls W/Dip',
    category: 'CRUNCHY BITES',
    price: 120, // Example image URL
    image: 'https://i.pinimg.com/736x/30/23/c6/3023c60e4804710b5a638e478c9cdfb1.jpg'
  },
  {
    id: 'veg-lollipop',
    name: 'Veg Lollipop W/Dip',
    category: 'CRUNCHY BITES',
    price: 100, // Example image URL
    image: 'https://i.pinimg.com/736x/30/23/c6/3023c60e4804710b5a638e478c9cdfb1.jpg'
  },

  // COMBOS
  {
    id: 'veg-combo',
    name: 'Veg Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 220, // Example image URL
    image: 'https://images.theconversation.com/files/410720/original/file-20210712-46002-1ku5one.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C1000%2C696&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip'
  },
  {
    id: 'chicken-combo',
    name: 'Chicken Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 230, // Example image URL
    image: 'https://images.theconversation.com/files/410720/original/file-20210712-46002-1ku5one.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C1000%2C696&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip'
  },

  // ROLLS / SANDWICHES / BURGERS / PIZZA
  {
    id: 'veg-sandwich',
    name: 'Veg Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'veg-burger',
    name: 'Veg Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'paneer-tikka-pizza',
    name: 'Paneer Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 150, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'egg-roll',
    name: 'Egg Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chicken-roll',
    name: 'Chicken Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'paneer-roll',
    name: 'Paneer Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'veg-puff',
    name: 'Veg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 40, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'egg-puff',
    name: 'Egg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 50, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'veg-samosa',
    name: 'Veg Samosa',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'veg-mug-noodles',
    name: 'Veg Mug Noodles',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'aloo-tikki',
    name: 'Aloo Tikki',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'veg-garlic-pop',
    name: 'Veg Garlic Pop',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chilli-fries',
    name: 'Chilli Fries W/Dip',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140, // Example image URL
    image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },

  // CHAATS
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'masala-puri',
    name: 'Masala Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'dahi-puri',
    name: 'Dahi Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'sev-puri',
    name: 'Sev Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'samosa-chat',
    name: 'Samosa Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'papdi-chat',
    name: 'Papdi Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'vada-pav',
    name: 'Vada Pav',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'tikki-chat',
    name: 'Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'dahi-tikki-chat',
    name: 'Dahi Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },
  {
    id: 'sukha-puri',
    name: 'Sukha Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100, // Example image URL
    image: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280'
  },

  // AMERICAN SWEET CORN
  {
    id: 'corn-butter-bbq',
    name: 'Classic Butter / BBQ',
    category: 'AMERICAN SWEET CORN',
    price: 100, // Example image URL
    image: 'https://www.thefieryvegetarian.com/wp-content/uploads/2018/11/masala-corn-recipe-square.jpg'
  },
  {
    id: 'corn-lemon-chilli',
    name: 'Lemon Chilli / Peri Peri',
    category: 'AMERICAN SWEET CORN',
    price: 100, // Example image URL
    image: 'https://www.thefieryvegetarian.com/wp-content/uploads/2018/11/masala-corn-recipe-square.jpg'
  },
  {
    id: 'corn-creamy-herbs',
    name: 'Creamy Herbs',
    category: 'AMERICAN SWEET CORN',
    price: 100, // Example image URL
    image: 'https://www.thefieryvegetarian.com/wp-content/uploads/2018/11/masala-corn-recipe-square.jpg'
  },
  {
    id: 'corn-schezwan',
    name: 'Schezwan',
    category: 'AMERICAN SWEET CORN',
    price: 100, // Example image URL
    image: 'https://www.thefieryvegetarian.com/wp-content/uploads/2018/11/masala-corn-recipe-square.jpg'
  },

  // CANDY BARS
  {
    id: 'snickers',
    name: 'Snickers',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },
  {
    id: 'bounty',
    name: 'Bounty',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },
  {
    id: 'skittles',
    name: 'Skittles',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },
  {
    id: 'twix',
    name: 'Twix',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },
  {
    id: 'mnms',
    name: 'M&M\'s',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP', // Example image URL
    image: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg'
  },

  // MILKSHAKES
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'cold-chocolate',
    name: 'Cold Chocolate',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'pista-shake',
    name: 'Pista',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'chickoo-shake',
    name: 'Chickoo',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'blackcurrant-shake',
    name: 'Blackcurrant',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'butterscotch-shake',
    name: 'Butterscotch',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'mango-shake',
    name: 'Mango',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'cold-caramel',
    name: 'Cold Caramel',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'cold-mocha',
    name: 'Cold Mocha',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'my-flavour',
    name: 'My Flavour',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'snickers-shake',
    name: 'Snickers Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups', // Example image URL
    image: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },

  // HOT STEAMERS
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    category: 'HOT STEAMERS',
    price: 20,
    description: 'MRP', // Example image URL
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'hot-coffee',
    name: 'Hot Coffee / Mocha',
    category: 'HOT STEAMERS',
    price: 70, // Example image URL
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate / Hot Caramello / Tea',
    category: 'HOT STEAMERS',
    price: 60, // Example image URL
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'green-tea',
    name: 'Green Tea / Lemon Tea',
    category: 'HOT STEAMERS',
    price: 50, // Example image URL
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'black-coffee-tea',
    name: 'Black Coffee / Tea',
    category: 'HOT STEAMERS',
    price: 50, // Example image URL
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },

  // DESSERTS
  {
    id: 'pastry',
    name: 'Pastry',
    category: 'DESSERTS',
    price: 130, // Example image URL
    image: 'https://www.eatingwell.com/thmb/ZnDItGc52VXjdEWR-th4FK_wsUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-desserts-with-more-protein-than-an-egg-8674533-hero-1x1-a9bb74ad11704f17a28e0fc17e3179b0.jpg'
  },
  {
    id: 'hot-brownie-fudge',
    name: 'Hot Brownie Fudge',
    category: 'DESSERTS',
    price: 90,
    maxPrice: 130, // Example image URL
    image: 'https://www.eatingwell.com/thmb/ZnDItGc52VXjdEWR-th4FK_wsUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-desserts-with-more-protein-than-an-egg-8674533-hero-1x1-a9bb74ad11704f17a28e0fc17e3179b0.jpg'
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams (2 Scoops Flavored)',
    category: 'DESSERTS',
    price: 100, // Example image URL
    image: 'https://www.eatingwell.com/thmb/ZnDItGc52VXjdEWR-th4FK_wsUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-desserts-with-more-protein-than-an-egg-8674533-hero-1x1-a9bb74ad11704f17a28e0fc17e3179b0.jpg'
  },
  {
    id: 'london-dairy',
    name: 'London Dairy / Baskin Robbins',
    category: 'DESSERTS',
    price: 80,
    description: 'MRP', // Example image URL
    image: 'https://www.eatingwell.com/thmb/ZnDItGc52VXjdEWR-th4FK_wsUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-desserts-with-more-protein-than-an-egg-8674533-hero-1x1-a9bb74ad11704f17a28e0fc17e3179b0.jpg'
  }
];

export const categories = [
  { id: 'POPCORN TIME', name: 'POPCORN TIME', imageUrl: 'https://www.simplyrecipes.com/thmb/Xzggu-Md45HKhhYSw4DK8tGlZ_I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Popcorn-LEAD-41-4a75a18443ae45aa96053f30a3ed0a6b.JPG', color: 'from-yellow-400 to-orange-500' },
  { id: 'SODAS & SIPS', name: 'SODAS & SIPS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Coca_Cola_Flasche_-_Original_Taste.jpg', color: 'from-blue-400 to-cyan-500' },
  { id: 'CRUNCHY BITES', name: 'CRUNCHY BITES', imageUrl: 'https://i.pinimg.com/736x/30/23/c6/3023c60e4804710b5a638e478c9cdfb1.jpg', color: 'from-red-400 to-pink-500' },
  { id: 'COMBOS', name: 'COMBOS', imageUrl: 'https://images.theconversation.com/files/410720/original/file-20210712-46002-1ku5one.jpg?ixlib=rb-4.1.0&rect=0%2C0%2C1000%2C696&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip', color: 'from-green-400 to-emerald-500' },
  { id: 'ROLLS / SANDWICHES / BURGERS / PIZZA', name: 'MAINS', imageUrl: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', color: 'from-purple-400 to-indigo-500' },
  { id: 'CHAATS', name: 'CHAATS', imageUrl: 'https://cdn.tasteatlas.com//images/dishes/bb8d66ccb459436da4b69770c9d8db86.jpg?w=375&h=280', color: 'from-orange-400 to-red-500' },
  { id: 'AMERICAN SWEET CORN', name: 'SWEET CORN', imageUrl: 'https://www.thefieryvegetarian.com/wp-content/uploads/2018/11/masala-corn-recipe-square.jpg', color: 'from-yellow-400 to-green-500' },
  { id: 'CANDY BARS', name: 'CANDY BARS', imageUrl: 'https://kirbiecravings.com/wp-content/uploads/2024/12/2-ingredient-candy-bars.jpg', color: 'from-pink-400 to-purple-500' },
  { id: 'MILKSHAKES', name: 'MILKSHAKES', imageUrl: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', color: 'from-cyan-400 to-blue-500' },
  { id: 'HOT STEAMERS', name: 'HOT STEAMERS', imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', color: 'from-amber-400 to-orange-500' },
  { id: 'DESSERTS', name: 'DESSERTS', imageUrl: 'https://www.eatingwell.com/thmb/ZnDItGc52VXjdEWR-th4FK_wsUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/EWL-desserts-with-more-protein-than-an-egg-8674533-hero-1x1-a9bb74ad11704f17a28e0fc17e3179b0.jpg', color: 'from-pink-400 to-rose-500' }
];