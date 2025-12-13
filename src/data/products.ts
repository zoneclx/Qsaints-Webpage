export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  sizes: string[];
  details: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Black Noir Shirt",
    price: 464,
    image: "/products/plainblack1.jpg",
    description: "Premium quality basics crafted for everyday comfort",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Premium Cotton",
      "Regular fit",
      "Pre-shrunk fabric",
      "Machine washable",
      "Made with sustainable materials"
    ]
  },
  {
    id: "2",
    name: "Qsaints Jacket",
    price: 1102,
    image: "/products/jacket1.jpg",
    description: "Comfortable streetwear essential with modern design",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "80% Cotton, 20% Polyester blend",
      "Relaxed fit",
      "Kangaroo pocket"
    ]
  },
  {
    id: "3",
    name: "Qsaint Black Cap",
    price: 290,
    image: "/products/cap1.jpg",
    description: "Plain black cap with gothic logo design",
    category: "Headwear",
    sizes: ["Standard"],
    details: ["Durable cotton twill"]
  },
  {
    id: "4",
    name: "Qsaints x Porsche",
    price: 696,
    image: "/products/porshe1.jpg",
    description: "Premium quality with Porsche GTRS design",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Premium Cotton",
      "Regular fit",
      "Pre-shrunk fabric",
      "Machine washable",
      "Made with sustainable materials"
    ]
  },
  {
    id: "5",
    name: "Qsaints Pants",
    price: 400,
    image: "/products/pants1.jpg",
    description: "Comfortable pants with wide sides",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "80% Cotton",
      "Relaxed fit",
      "Durable fabric"
    ]
  },
  {
    id: "6",
    name: "Qsaints Hoodie",
    price: 1000,
    image: "/products/hoodie1.jpg",
    description: "Comfortable streetwear essential with modern design",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "80% Cotton, 20% Polyester blend",
      "Relaxed fit",
      "Kangaroo pocket",
      "Durable cotton"
    ]
  },
  {
    id: "7",
    name: "Qsaints Plain Black",
    price: 450,
    image: "/products/plainblack2.jpg",
    description: "Comfortable streetwear design",
    category: "Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "100% Premium Cotton",
      "Relaxed fit",
      "Machine washable",
      "French terry cotton"
    ]
  },
  {
    id: "8",
    name: "Qsaints Black Cropped Tee",
    price: 990,
    image: "/products/tee1.jpg",
    description: "Comfortable with modern design",
    category: "Tops",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "100% Premium Cotton",
      "Relaxed fit",
      "French terry cotton"
    ]
  }
];
