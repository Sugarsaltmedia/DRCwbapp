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
    hasVariants: true,
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fpopcorn%2F&psig=AOvVaw3jAJaPDyDpVPJDOy3Trqo3&ust=1762265116597000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjvg6WT1pADFQAAAAAdAAAAABAE'
  },
  {
    id: 'popcorn-butter',
    name: 'Butter',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJgmutk30wQOKBWibtTpymaf4n9pomrh-lQ&s'
  },
  {
    id: 'popcorn-cheese',
    name: 'Cheese',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://www.foodlovinfamily.com/wp-content/uploads/2021/11/cheese-popcorn.jpg'
  },
  {
    id: 'popcorn-tomato-chilli',
    name: 'Tomato Chilli',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPRAaLZt8NMEqsHy3LTdJj8e7NfMsR9Tnt3A&s'
  },
  {
    id: 'popcorn-barbeque',
    name: 'Barbeque (Spicy)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSob99IFbhNfGQNEVHgRFGJvYr_cKCQ52kULg&s'
  },
  {
    id: 'popcorn-onion',
    name: 'Onion (Creamy)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvVgXjljNYBKAlfg5C_9PB0p7rL3Ux9xZO-g&s'
  },
  {
    id: 'popcorn-peri-peri',
    name: 'Peri Peri (Smoky)',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/2/387544598/VK/QF/DP/1942266/super-hot-piri-popcorn.jpg'
  },
  {
    id: 'popcorn-mexican',
    name: 'Mexican',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_P1j472HFV_nkOT79xrFH990zIQfLpgFq_A&s'
  },
  {
    id: 'popcorn-schezwan',
    name: 'Schezwan',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://2.wlimg.com/product_images/bc-full/2022/4/6076016/schezwan-popcorn-1651303009-6316261.jpeg'
  },
  {
    id: 'popcorn-my-mix',
    name: 'My Mix',
    category: 'POPCORN TIME',
    price: 150,
    maxPrice: 300,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'popcorn-butter-mix',
    name: 'My Butter Flavour Mix',
    category: 'POPCORN TIME',
    price: 170,
    maxPrice: 340,
    sizes: ['Small', 'Large'],
    hasVariants: true,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&crop=center'
  },

  // SODAS & SIPS
  {
    id: 'coke-fanta-sprite',
    name: 'Coke/Fanta/Sprite',
    category: 'SODAS & SIPS',
    price: 120,
    description: 'Served without ice',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'lemon-ice-tea',
    name: 'Lemon Ice Tea',
    category: 'SODAS & SIPS',
    price: 100,
    description: 'Served without ice',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'paper-boat',
    name: 'Paper Boat',
    category: 'SODAS & SIPS',
    price: 50,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center'
  },

  // CRUNCHY BITES
  {
    id: 'nachos',
    name: 'Nachos W/Dip',
    category: 'CRUNCHY BITES',
    price: 150,
    maxPrice: 160,
    image: 'https://images.unsplash.com/photo-1582169296194-854173e19d17?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'pizza-cheese',
    name: 'Pizza Cheese W/Dip',
    category: 'CRUNCHY BITES',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'spring-rolls',
    name: 'Spring Rolls W/Dip',
    category: 'CRUNCHY BITES',
    price: 120,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-lollipop',
    name: 'Veg Lollipop W/Dip',
    category: 'CRUNCHY BITES',
    price: 100,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center'
  },

  // COMBOS
  {
    id: 'veg-combo',
    name: 'Veg Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 220,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chicken-combo',
    name: 'Chicken Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 230,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop&crop=center'
  },

  // ROLLS / SANDWICHES / BURGERS / PIZZA
  {
    id: 'veg-sandwich',
    name: 'Veg Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-burger',
    name: 'Veg Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'paneer-tikka-pizza',
    name: 'Paneer Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 150,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'egg-roll',
    name: 'Egg Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chicken-roll',
    name: 'Chicken Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'paneer-roll',
    name: 'Paneer Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-puff',
    name: 'Veg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 40,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'egg-puff',
    name: 'Egg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 50,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-samosa',
    name: 'Veg Samosa',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-mug-noodles',
    name: 'Veg Mug Noodles',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'aloo-tikki',
    name: 'Aloo Tikki',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'veg-garlic-pop',
    name: 'Veg Garlic Pop',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chilli-fries',
    name: 'Chilli Fries W/Dip',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center'
  },

  // CHAATS
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'masala-puri',
    name: 'Masala Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'dahi-puri',
    name: 'Dahi Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'sev-puri',
    name: 'Sev Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'samosa-chat',
    name: 'Samosa Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'papdi-chat',
    name: 'Papdi Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'vada-pav',
    name: 'Vada Pav',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'tikki-chat',
    name: 'Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'dahi-tikki-chat',
    name: 'Dahi Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'sukha-puri',
    name: 'Sukha Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&crop=center'
  },

  // AMERICAN SWEET CORN
  {
    id: 'corn-butter-bbq',
    name: 'Classic Butter / BBQ',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'corn-lemon-chilli',
    name: 'Lemon Chilli / Peri Peri',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'corn-creamy-herbs',
    name: 'Creamy Herbs',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'corn-schezwan',
    name: 'Schezwan',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://images.unsplash.com/photo-1595475038665-8b8407f8c04f?w=400&h=300&fit=crop&crop=center'
  },

  // CANDY BARS
  {
    id: 'snickers',
    name: 'Snickers',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'bounty',
    name: 'Bounty',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'skittles',
    name: 'Skittles',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'twix',
    name: 'Twix',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'mnms',
    name: 'M&M\'s',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1489900464632-40d4b8799d46?w=400&h=300&fit=crop&crop=center'
  },

  // MILKSHAKES
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'cold-chocolate',
    name: 'Cold Chocolate',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'pista-shake',
    name: 'Pista',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1553787499-6d7ad2b3b2e5?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'chickoo-shake',
    name: 'Chickoo',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'blackcurrant-shake',
    name: 'Blackcurrant',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'butterscotch-shake',
    name: 'Butterscotch',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1595475038665-8b8407f8c04f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'mango-shake',
    name: 'Mango',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'cold-caramel',
    name: 'Cold Caramel',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1489900464632-40d4b8799d46?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'cold-mocha',
    name: 'Cold Mocha',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'my-flavour',
    name: 'My Flavour',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'snickers-shake',
    name: 'Snickers Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=300&fit=crop&crop=center'
  },

  // HOT STEAMERS
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    category: 'HOT STEAMERS',
    price: 20,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'hot-coffee',
    name: 'Hot Coffee / Mocha',
    category: 'HOT STEAMERS',
    price: 70,
    image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate / Hot Caramello / Tea',
    category: 'HOT STEAMERS',
    price: 60,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'green-tea',
    name: 'Green Tea / Lemon Tea',
    category: 'HOT STEAMERS',
    price: 50,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'black-coffee-tea',
    name: 'Black Coffee / Tea',
    category: 'HOT STEAMERS',
    price: 50,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&crop=center'
  },

  // DESSERTS
  {
    id: 'pastry',
    name: 'Pastry',
    category: 'DESSERTS',
    price: 130,
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'hot-brownie-fudge',
    name: 'Hot Brownie Fudge',
    category: 'DESSERTS',
    price: 90,
    maxPrice: 130,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams (2 Scoops Flavored)',
    category: 'DESSERTS',
    price: 100,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&crop=center'
  },
  {
    id: 'london-dairy',
    name: 'London Dairy / Baskin Robbins',
    category: 'DESSERTS',
    price: 80,
    description: 'MRP',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center'
  }
];

export const categories = [ // Updated category images with unique, high-quality food category images
  { id: 'POPCORN TIME', name: 'POPCORN TIME', imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop&crop=center', color: 'from-yellow-400 to-orange-500' },
  { id: 'SODAS & SIPS', name: 'SODAS & SIPS', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center', color: 'from-blue-400 to-cyan-500' },
  { id: 'CRUNCHY BITES', name: 'CRUNCHY BITES', imageUrl: 'https://images.unsplash.com/photo-1582169296194-854173e19d17?w=400&h=300&fit=crop&crop=center', color: 'from-red-400 to-pink-500' },
  { id: 'COMBOS', name: 'COMBOS', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center', color: 'from-green-400 to-emerald-500' },
  { id: 'ROLLS / SANDWICHES / BURGERS / PIZZA', name: 'MAINS', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center', color: 'from-purple-400 to-indigo-500' },
  { id: 'CHAATS', name: 'CHAATS', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center', color: 'from-orange-400 to-red-500' },
  { id: 'AMERICAN SWEET CORN', name: 'SWEET CORN', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center', color: 'from-yellow-400 to-green-500' },
  { id: 'CANDY BARS', name: 'CANDY BARS', imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&h=300&fit=crop&crop=center', color: 'from-pink-400 to-purple-500' },
  { id: 'MILKSHAKES', name: 'MILKSHAKES', imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=300&fit=crop&crop=center', color: 'from-cyan-400 to-blue-500' },
  { id: 'HOT STEAMERS', name: 'HOT STEAMERS', imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop&crop=center', color: 'from-amber-400 to-orange-500' },
  { id: 'DESSERTS', name: 'DESSERTS', imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center', color: 'from-pink-400 to-rose-500' }
];