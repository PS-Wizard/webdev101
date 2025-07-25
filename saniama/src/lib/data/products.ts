export type Product = {
    images: string[];
    name: string;
    price: number;
    stock: number;
    discounts: number;
    sizes: number[];
};

export const latestFromUs: Product[] = [
    {
        name: "Alpaca Wool Turtleneck",
        images: ["/images/card_1.png", "/images/products/alpaca-turtleneck-2.png"],
        price: 320,
        stock: 12,
        discounts: 10,
        sizes: [1, 2, 3],
    },
    {
        name: "Hand-Knit Cashmere Wrap",
        images: ["/images/card_1.png", "/images/products/alpaca-turtleneck-2.png"],
        price: 450,
        stock: 5,
        discounts: 0,
        sizes: [2, 3],
    },
    {
        name: "Organic Cotton Cable Sweater",
        images: ["/images/card_1.png", "/images/products/alpaca-turtleneck-2.png"],
        price: 280,
        stock: 8,
        discounts: 15,
        sizes: [1, 2, 3, 4],
    },
    {
        name: "Merino Wool Beanie",
        images: ["/images/card_1.png", "/images/products/alpaca-turtleneck-2.png"],
        price: 90,
        stock: 25,
        discounts: 5,
        sizes: [2, 3],
    },
    {
        name: "Recycled Cashmere Fingerless Gloves",
        images: ["/images/card_1.png", "/images/products/alpaca-turtleneck-2.png"],
        price: 110,
        stock: 10,
        discounts: 0,
        sizes: [1],
    },
];
