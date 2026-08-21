export const mainCategories = [
  'Ramen',
  'Sides',
  'Drink',
  'Promo',
];

export const ramenCategories = [
  'Tonkotsu',
  'Shoyu',
  'Miso',
  'AA',
  'BB',
  'CC',
];

export const ramenMenus = {
  Tonkotsu: [
    {
      id: 1,
      name: 'Special Shinjuku Ramen',
      price: 30,
      image: 'https://example.com/ramen1.jpg',
    },

    {
      id: 2,
      name: 'Shinjuku Ramen',
      price: 28,
      image: 'https://example.com/ramen2.jpg',
    },

    {
      id: 3,
      name: 'Spicy Tonkotsu Ramen',
      price: 30,
      image: 'https://example.com/ramen3.jpg',

      noodles: [
        {
          id: 1,
          name: 'Regular Noodles',
          price: 0,
        },
        {
          id: 2,
          name: 'Firm Noodles',
          price: 0,
        },
        {
          id: 3,
          name: 'Soft Noodles',
          price: 0,
        },
      ],

      broth: [
        {
          id: 1,
          name: 'Normal',
          price: 0,
        },
        {
          id: 2,
          name: 'Rich',
          price: 0,
        },
        {
          id: 3,
          name: 'Extra Rich',
          price: 2,
        },
      ],

      toppings: [
        {
          id: 1,
          name: 'None',
          price: 0,
        },
        {
          id: 2,
          name: 'Nori',
          price: 0,
        },
        {
          id: 3,
          name: 'Corn',
          price: 2,
        },
        {
          id: 4,
          name: 'Menma (Bamboo Shoot)',
          price: 0,
        },
        {
          id: 5,
          name: 'Spring Onion',
          price: 0,
        },
      ],
    },
  ],

  Shoyu: [
    {
      id: 4,
      name: 'Special Shoyu Ramen',
      price: 30,
      image:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    },

    {
      id: 5,
      name: 'Classic Shoyu Ramen',
      price: 26,
      image:
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
    },
  ],

  Miso: [
    {
      id: 6,
      name: 'Special Miso Ramen',
      price: 29,
      image:
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500',
    },
  ],

  AA: [
    {
      id: 7,
      name: 'AA Ramen',
      price: 32,
      image:
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
    },
  ],

  BB: [
    {
      id: 8,
      name: 'BB Ramen',
      price: 33,
      image:
        'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500',
    },
  ],

  CC: [
    {
      id: 9,
      name: 'CC Ramen',
      price: 35,
      image:
        'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500',
    },
  ],
};

export const sidesMenu = [
  {
    id: 101,
    name: 'Gyoza',
    price: 15,
    image:
      'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=500',
  },

  {
    id: 102,
    name: 'Karaage',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500',
  },
];

export const drinkMenu = [
  {
    id: 201,
    name: 'Ocha',
    price: 8,
    image:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500',
  },

  {
    id: 202,
    name: 'Ramune',
    price: 10,
    image:
      'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?w=500',
  },
];

export const promoMenu = [
  {
    id: 301,
    name: 'Ramen Set Promo',
    price: 35,
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500',
  },
];