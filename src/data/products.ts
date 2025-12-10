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
    name: "Black Noir S",
    price: 89,
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
    name: "Qsaints jacket",
    price: 129,
    image: "/products/jacket1.jpg",
    description: "Comfortable streetwear essential with modern design",
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "80% Cotton, 20% Polyester blend",
      "Relaxed fit",
      "Adjustable drawstring hood",
      "Kangaroo pocket"
    ]
  },
  {
    id: "3",
    name: "Qsaint black Cap",
    price: 149,
    image: "/products/cap1.jpg",
    description: "plain black cap with gothic logo design",
    category: "Headwear",
    sizes: ["standard size only"],
    details: [
      "Durable cotton twill"
    ]
  },
  {  
    id: "4",
    name: "Qsaints x Porsche",
    price: 89,
    image: "/products/porshe1.jpg",
    description: "Premium quality with porshe gtrs design",
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    details: [
      "100% Premium Cotton",
      "Regular fit",
      "Pre-shrunk fabric",
      "Machine washable",
      "Made with sustainable materials"
    ]
  }
];
