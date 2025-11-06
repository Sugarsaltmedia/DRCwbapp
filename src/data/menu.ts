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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXvtzh--aitD9MQXghx32hKqjTlPWbSm3J2g&s'
  },

  // SODAS & SIPS
  {
    id: 'coke-fanta-sprite',
    name: 'Coke/Fanta/Sprite',
    category: 'SODAS & SIPS',
    price: 120,
    description: 'Served without ice',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTLLB18I9Ie_lbSd9X1o4sPYzbBMkl9D74UngKPIUZb4qd7aA'
  },
  {
    id: 'lemon-ice-tea',
    name: 'Lemon Ice Tea',
    category: 'SODAS & SIPS',
    price: 100,
    description: 'Served without ice',
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRAXwPoONZ4KE6Y4Y1HcKDElyHmp2Xvmx1EyXOQd0CfxdnIJA'
  },
  {
    id: 'paper-boat',
    name: 'Paper Boat',
    category: 'SODAS & SIPS',
    price: 50,
    description: 'MRP',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQenS1kOkGomf_YIuyoDlR60ocAOpwan5xLw-CjyelcQsUZcQ'
  },

  // CRUNCHY BITES
  {
    id: 'nachos',
    name: 'Nachos W/Dip',
    category: 'CRUNCHY BITES',
    price: 150,
    maxPrice: 160,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTHKegJDO2SunjPTcFYSCmf_olN2kNIWICg1EVe2zJpQ_P9WA'
  },
  {
    id: 'pizza-cheese',
    name: 'Pizza Cheese W/Dip',
    category: 'CRUNCHY BITES',
    price: 120,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ-dMJbMZshrdzeZcudSkBIfSFy6HkCkPkD3TmEoibq7oMxQQ'
  },
  {
    id: 'spring-rolls',
    name: 'Spring Rolls W/Dip',
    category: 'CRUNCHY BITES',
    price: 120,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQYwQwk3z4bFVkOdGuizG9cJMhyGsv6U6pJQqm_a9SNKgR2g'
  },
  {
    id: 'veg-lollipop',
    name: 'Veg Lollipop W/Dip',
    category: 'CRUNCHY BITES',
    price: 100,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTrzJ046LWB_YLrKnO_CKjCHutwkXQR8T2yVwo5Wmbbzf8Plg'
  },

  // COMBOS
  {
    id: 'veg-combo',
    name: 'Veg Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 220,
    image: 'https://www.shutterstock.com/image-photo/burger-fries-coke-on-wood-600nw-1798650394.jpg'
  },
  {
    id: 'chicken-combo',
    name: 'Chicken Burger + Chilli Fries + Coke',
    category: 'COMBOS',
    price: 230,
    image: 'https://content.jdmagicbox.com/v2/comp/mumbai/w8/022pxx22.xx22.240627200621.k8w8/catalogue/kha-burgers-fries-fried-chicken-mumbai-restaurants-xsbgkmh0kd-250.jpg'
  },

  // ROLLS / SANDWICHES / BURGERS / PIZZA
  {
    id: 'veg-sandwich',
    name: 'Veg Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4mFHPpiPfQKkWfxxEMqSOmUHovfVQBzW2SNB1r9I7VZldaw'
  },
  {
    id: 'veg-burger',
    name: 'Veg Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 130,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS0_pvWA22DcqKv1ZRm0G2-sLe4izxdKTdy5dQleqoBb3BweQ'
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRd5SPbjy6kpcsYtebb3bJjT-zJbwud1H4ZsJSSqUrgkvBTOQ'
  },
  {
    id: 'chicken-burger',
    name: 'Chicken Burger',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSJmviaLrOj1fLn_av8d85nxcIL1wpgV96Z5C16lbyWvWN_g'
  },
  {
    id: 'paneer-tikka-pizza',
    name: 'Paneer Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSaqOSNUdOMF64e8nfq8SDJSfTGf2yNwYFd9FgJC1uuFrrn_Q'
  },
  {
    id: 'chicken-tikka-pizza',
    name: 'Chicken Tikka Pizza',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 150,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTRojgtQ6EjRlHYMXN3VHa3I-AtOLYZcNhJqH8GwnFtDQt-sg'
  },
  {
    id: 'egg-roll',
    name: 'Egg Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSqCwy7XTEby6QloPJWfKWWKg3yvFqHVwa_gNo8Rr09Ivm2HQ'
  },
  {
    id: 'chicken-roll',
    name: 'Chicken Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo3EdiMD9BBfs1wQnuxweoB6iyKj9f6vdjo8grZkur_pJVKw'
  },
  {
    id: 'paneer-roll',
    name: 'Paneer Roll',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 100,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRshbwGGJT_n9dEFEnoIgowTUfwUioQ_mI3xvpUOGiygqlJcg'
  },
  {
    id: 'veg-puff',
    name: 'Veg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 40,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR0Xf_fwEVc01p6mz4P7-OH2tNPFuwbDLT1u6hH6HfpBSUeRg'
  },
  {
    id: 'egg-puff',
    name: 'Egg Puff',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 50,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR0Xf_fwEVc01p6mz4P7-OH2tNPFuwbDLT1u6hH6HfpBSUeRg'
  },
  {
    id: 'veg-samosa',
    name: 'Veg Samosa',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk44H7lfHaSJtsPSQnd7OgJN7QHpcFxDHD02sCcxFSgJiKaA'
  },
  {
    id: 'veg-mug-noodles',
    name: 'Veg Mug Noodles',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQc7-fvt7AdRKiKv6iUnpukY7GSIPVzZXz58JPlvRezyh2TGA'
  },
  {
    id: 'aloo-tikki',
    name: 'Aloo Tikki',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 70,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCIe4uuTpRPCJW10hHn-reStcnPv9PFSTKTTHDsdZUz54TVw'
  },
  {
    id: 'veg-garlic-pop',
    name: 'Veg Garlic Pop',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 90,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRlDpr4sq__cZ1FJ5gchNDSnJEKp-e0xrNhDfOX_VaVl-KpIw'
  },
  {
    id: 'chilli-fries',
    name: 'Chilli Fries W/Dip',
    category: 'ROLLS / SANDWICHES / BURGERS / PIZZA',
    price: 140,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuUpbsuzNnci12WtsM99p1nxejAGKF8thiUHx3rP8rlNmQpw'
  },

  // CHAATS
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTUs1cVl16JwICHVlffvlUmIzwN-xC_cAvPEVUr8khX4BwXTg'
  },
  {
    id: 'masala-puri',
    name: 'Masala Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTFclMeD5JXuUNc_8AqRgBIR8ivGpH1zEgtZRcNZEEXvjurow'
  },
  {
    id: 'dahi-puri',
    name: 'Dahi Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmyfx0wdCgvlrPvpaijTaRXeAHJKpD3bQTQ5RQU18bbaeFhQ'
  },
  {
    id: 'sev-puri',
    name: 'Sev Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRxaVu4ycQL9P_wd2C2ZoNLHxaCu2fPLysec4x_WPI3Chbzxg'
  },
  {
    id: 'samosa-chat',
    name: 'Samosa Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJjPjwDdpSEBFRtvfsKp1LYeQIcdC2l7G8NC3jGLB7Wila1w'
  },
  {
    id: 'papdi-chat',
    name: 'Papdi Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQBfI9yKWJP5M06DxsomxmmGa-B_TFjLmOQ8wGmQvnVJYoPTQ'
  },
  {
    id: 'vada-pav',
    name: 'Vada Pav',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGeXg8uoRJSORhK32n84VdiK7htQ01JZmlFHd1-hGVZIrsNg'
  },
  {
    id: 'tikki-chat',
    name: 'Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQSW98LGaY5NYN7h7k_pY27l8XatoEpHdPML9d95KcjPd-tFg'
  },
  {
    id: 'dahi-tikki-chat',
    name: 'Dahi Tikki Chat',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo87Hx0j_xKNZWdnUyA1x24sfd042_mMwdJoGfXw0x7ucyRA'
  },
  {
    id: 'sukha-puri',
    name: 'Sukha Puri',
    category: 'CHAATS',
    price: 70,
    maxPrice: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsJ00vaYqupIVm7nboud2hQJVX6f71YlgkPqg-Rs24qGDfYA'
  },

  // AMERICAN SWEET CORN
  {
    id: 'corn-butter-bbq',
    name: 'Classic Butter / BBQ',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKhr2JmmBzrGKcmRwD1lDPnip3I1QLA1ui-zBLjG8q91opXg'
  },
  {
    id: 'corn-lemon-chilli',
    name: 'Lemon Chilli / Peri Peri',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcToeOn0JQvNOSvzt82PJpN4Kh8yXR6ZDmDxd9wv19k3hYgmmg'
  },
  {
    id: 'corn-creamy-herbs',
    name: 'Creamy Herbs',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJappoIAcSsdbPFeYr04XwBMkfLYaxi3_NUXWwevsx6LVLfw'
  },
  {
    id: 'corn-schezwan',
    name: 'Schezwan',
    category: 'AMERICAN SWEET CORN',
    price: 100,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSdTonF_AIpoHkviB_WMO_falKP-oqO---BKE5nEKcdqQX2Aw'
  },

  // CANDY BARS
  {
    id: 'snickers',
    name: 'Snickers',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMR__wZih_Zas12CHlEcwFd6BD322Bg0n2Dg&s'
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfU3wvXG4GEjOW5tmPfh6UL8s7J-UR_WW5Sg&s'
  },
  {
    id: 'bounty',
    name: 'Bounty',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://5.imimg.com/data5/RM/LR/GB/GLADMIN-6335932/bounty-chocolate-500x500.jpg'
  },
  {
    id: 'skittles',
    name: 'Skittles',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2021-01-22/Skittles_Original_Fruit_Flavoured_Candies_-_100_Gm.jpg'
  },
  {
    id: 'twix',
    name: 'Twix',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://www.twix.com/sites/g/files/fnmzdf236/files/migrate-product-files/yxivq2efs1ufsp7ncvvs.png'
  },
  {
    id: 'mnms',
    name: 'M&M\'s',
    category: 'CANDY BARS',
    price: 40,
    description: 'MRP',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd_B4a0rSveOyY94SzLl5Mp-VaU_PnYRT__g&s'
  },

  // MILKSHAKES
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://images.unsplash.com/photo-1530373239216-42518e6b4063?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000'
  },
  {
    id: 'cold-chocolate',
    name: 'Cold Chocolate',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmg8kieYzUWCG03GsHwkkzcNKsAEg9FSXqpw&s'
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIF0uBm3K6xjXW_ZDYuRV8MgcS4LsuLg51FA&s'
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKF3DT9oloMgQjxSQkDkUh1MNXJGsotggTcA&s'
  },
  {
    id: 'pista-shake',
    name: 'Pista',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/61185087-efbd-48e1-94e8-1d79fcc8bf9f.__CR63,0,535,535_PT0_SX300_V1___.jpg'
  },
  {
    id: 'chickoo-shake',
    name: 'Chickoo',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://www.cadburydessertscorner.com/hs-fs/hubfs/dc-website-2022/articles/refreshing-chikoo-milkshake-for-a-tropical-twist/conclusion.webp?width=1015&height=767&name=conclusion.webp'
  },
  {
    id: 'blackcurrant-shake',
    name: 'Blackcurrant',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://img.thecdn.in/261217/SKU-1483_0-1744949108188.jpg?width=600&format=webp'
  },
  {
    id: 'butterscotch-shake',
    name: 'Butterscotch',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZR9mC6REgb_sHJbCGZCC_lO79U3rIFvsziQ&sv'
  },
  {
    id: 'mango-shake',
    name: 'Mango',
    category: 'MILKSHAKES',
    price: 140,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwangb5vOu-1enlRT7HnjO1g-AbAPkTzHORA&s'
  },
  {
    id: 'cold-caramel',
    name: 'Cold Caramel',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5JJIhJBhfPqxEVEiywmzZDA-6LFXa_H3k3A&s'
  },
  {
    id: 'cold-mocha',
    name: 'Cold Mocha',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://bakingmischief.com/wp-content/uploads/2019/05/iced-mocha-image-square.jpg'
  },
  {
    id: 'my-flavour',
    name: 'My Flavour',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://i.ytimg.com/vi/-MTa9JY5WnA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBEbIylPxkGD3-Bo_ae_D2aAHDjFQ'
  },
  {
    id: 'oreo-shake',
    name: 'Oreo Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB6D17qtlr1DOisCc_8LJtmUIZt1xVhDZwg&s'
  },
  {
    id: 'snickers-shake',
    name: 'Snickers Shake',
    category: 'MILKSHAKES',
    price: 150,
    description: '350ml, served without ice/syrups',
    image: 'https://m.media-amazon.com/images/I/61C2vBqWzmL.jpg'
  },

  // HOT STEAMERS
  {
    id: 'water-bottle',
    name: 'Water Bottle',
    category: 'HOT STEAMERS',
    price: 20,
    description: 'MRP',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXx1r8apCNOzDHMqCgAoFjcG6KW9MlUfOJ2A&s'
  },
  {
    id: 'hot-coffee',
    name: 'Hot Coffee / Mocha',
    category: 'HOT STEAMERS',
    price: 70,
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTCoJChyFJuXVFlwLUUk2DcLSGWWWmWoMkrSMH5tMNVFUIJyw'
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate / Hot Caramello / Tea',
    category: 'HOT STEAMERS',
    price: 60,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTPS1N8b2s0Cv7F1p797ZQG5q0Oo3yhXffv9NEVd2MxAvPbyA'
  },
  {
    id: 'green-tea',
    name: 'Green Tea / Lemon Tea',
    category: 'HOT STEAMERS',
    price: 50,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0GdThr9gp9xj6O9vH8e5fr2JUXA6RtUvXNg&s'
  },
  {
    id: 'black-coffee-tea',
    name: 'Black Coffee / Tea',
    category: 'HOT STEAMERS',
    price: 50,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6AFDokY0G_VrjhG5C1aMlL2HFXyEJpupJdg&s'
  },

  // DESSERTS
  {
    id: 'pastry',
    name: 'Pastry',
    category: 'DESSERTS',
    price: 130,
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQFxCoZD1p6zI1w1A1x4kbLjL08oFCdhVKvUubggxCyhAzZFQ'
  },
  {
    id: 'hot-brownie-fudge',
    name: 'Hot Brownie Fudge',
    category: 'DESSERTS',
    price: 90,
    maxPrice: 130,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQsLl-tKJQqyzpzCU9eLmGrhqWFfhRnP2HKT2XtElcK4EIKg'
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams (2 Scoops Flavored)',
    category: 'DESSERTS',
    price: 100,
    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRwhKV_gpl3uCMSTXTCPQrYiEY5wy88vJ-AQX-kqzDSRbJ8bg'
  },
  {
    id: 'london-dairy',
    name: 'London Dairy / Baskin Robbins',
    category: 'DESSERTS',
    price: 80,
    description: 'MRP',
    image: 'https://cdn.grofers.com/da/cms-assets/cms/product/3eabce04-05dd-40e1-b0f3-2c9f5b7b535a.jpg'
  }
];

export const categories = [ // Updated category images with unique, high-quality food category images
  { id: 'POPCORN TIME', name: 'POPCORN TIME', imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400&h=300&fit=crop&crop=center', color: 'from-yellow-400 to-orange-500' },
  { id: 'SODAS & SIPS', name: 'SODAS & SIPS', imageUrl: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center', color: 'from-blue-400 to-cyan-500' },
  { id: 'CRUNCHY BITES', name: 'CRUNCHY BITES', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSGYDaMLqwfKcpvAXz-DMquJvzgvKMMH9FvTjU8mclQK28Oxw', color: 'from-red-400 to-pink-500' },
  { id: 'COMBOS', name: 'COMBOS', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center', color: 'from-green-400 to-emerald-500' },
  { id: 'ROLLS / SANDWICHES / BURGERS / PIZZA', name: 'MAINS', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center', color: 'from-purple-400 to-indigo-500' },
  { id: 'CHAATS', name: 'CHAATS', imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center', color: 'from-orange-400 to-red-500' },
  { id: 'AMERICAN SWEET CORN', name: 'SWEET CORN', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center', color: 'from-yellow-400 to-green-500' },
  { id: 'CANDY BARS', name: 'CANDY BARS', imageUrl: 'https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=400&h=300&fit=crop&crop=center', color: 'from-pink-400 to-purple-500' },
  { id: 'MILKSHAKES', name: 'MILKSHAKES', imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=400&h=300&fit=crop&crop=center', color: 'from-cyan-400 to-blue-500' },
  { id: 'HOT STEAMERS', name: 'HOT STEAMERS', imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop&crop=center', color: 'from-amber-400 to-orange-500' },
  { id: 'DESSERTS', name: 'DESSERTS', imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center', color: 'from-pink-400 to-rose-500' }
];