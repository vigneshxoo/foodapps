export interface Product {
    id: number;
    name: string;
    price: string;
    weight: string;
    image: string;
    category: string;
    tag?: string;
    description: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Power Detergent",
        price: "₹44.00",
        weight: "500g",
        image: "https://static.wixstatic.com/media/052b2d_ce922366a3ad45b8815e5114dd7c3632~mv2.jpg",
        category: "Detergent",
        tag: "Best Seller",
        description: "Our signature Power Detergent is designed for maximum cleaning efficiency. It removes tough stains while being gentle on the fabric. Infused with a long-lasting fragrance that keeps your clothes fresh for days."
    },
    {
        id: 2,
        name: "Aloe Vera Soap",
        price: "₹35.00",
        weight: "125g",
        image: "https://static.wixstatic.com/media/052b2d_918048c738f2483299dcab0bd56fdb82~mv2.jpg",
        category: "Bath Soap",
        tag: "Pure",
        description: "Experience the soothing power of Aloe Vera with our premium bath soap. It provides deep moisturization and skin protection. Perfect for daily use, leaving your skin feeling soft and rejuvenated."
    },
    {
        id: 3,
        name: "Dishwash Gel",
        price: "₹20.00",
        weight: "250ml",
        image: "https://static.wixstatic.com/media/052b2d_04075237799a410ba8005b3414d51e22~mv2.jpg",
        category: "Liquid",
        tag: "Eco",
        description: "Tough on grease, easy on hands. Our Dishwash Gel cuts through the stickiest residue instantly. The lemon-fresh scent ensures your utensils smell as clean as they look."
    },
    {
        id: 4,
        name: "Family Combo",
        price: "₹199.00",
        weight: "Pack of 5",
        image: "https://static.wixstatic.com/media/052b2d_ec5fdd594ff74477ba5d12d3158b5789~mv2.jpg",
        category: "Detergent",
        tag: "Value",
        description: "The complete cleaning solution for your family. This combo pack includes a selection of our best-selling detergents and soaps at an unbeatable price. Stock up and save more!"
    },
    {
        id: 5,
        name: "Power Cake",
        price: "₹15.00",
        weight: "150g",
        image: "https://static.wixstatic.com/media/052b2d_ce922366a3ad45b8815e5114dd7c3632~mv2.jpg",
        category: "Cake",
        tag: "Strong",
        description: "The classic Power Cake for manual laundry. Its concentrated formula tackles dirt in one wash. Economical and effective for everyday clothes."
    },
    {
        id: 6,
        name: "Lemon Liquid",
        price: "₹45.00",
        weight: "500ml",
        image: "https://static.wixstatic.com/media/052b2d_04075237799a410ba8005b3414d51e22~mv2.jpg",
        category: "Liquid",
        tag: "Fresh",
        description: "High-performance liquid detergent with the zesty freshness of lemon. It dissolves quickly even in cold water, ensuring a thorough clean every time."
    },
    {
        id: 7,
        name: "Sandal Soap",
        price: "₹40.00",
        weight: "125g",
        image: "https://static.wixstatic.com/media/052b2d_918048c738f2483299dcab0bd56fdb82~mv2.jpg",
        category: "Bath Soap",
        tag: "Premium",
        description: "Indulge in the traditional luxury of Sandalwood. This premium soap nourishes the skin and offers a rich, calming aroma that lingers all day."
    },
];
