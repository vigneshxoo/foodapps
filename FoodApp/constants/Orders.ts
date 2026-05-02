export interface OrderItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
    weight: string;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    total: string;
    status: 'Pending' | 'Approved' | 'Delivered' | 'Cancelled';
    items: OrderItem[];
    subtotal: string;
    deliveryFee: string;
    tax: string;
}

export const ORDERS: Order[] = [
    {
        id: '#OR-4592',
        date: 'Oct 24, 2023',
        total: '₹450.00',
        status: 'Delivered',
        subtotal: '₹400.00',
        deliveryFee: '₹30.00',
        tax: '₹20.00',
        items: [
            {
                id: 1,
                name: 'Organic Power Soap',
                price: '₹120.00',
                quantity: 2,
                weight: '150g',
                image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?q=80&w=1000&auto=format&fit=crop'
            },
            {
                id: 2,
                name: 'Herbal Infusion Soap',
                price: '₹80.00',
                quantity: 2,
                weight: '100g',
                image: 'https://images.unsplash.com/photo-1547792850-d7c32e945cb0?q=80&w=1000&auto=format&fit=crop'
            }
        ],
    },
    {
        id: '#OR-4581',
        date: 'Oct 22, 2023',
        total: '₹120.00',
        status: 'Pending',
        subtotal: '₹100.00',
        deliveryFee: '₹20.00',
        tax: '₹0.00',
        items: [
            {
                id: 3,
                name: 'Lemon Fresh Soap',
                price: '₹50.00',
                quantity: 2,
                weight: '100g',
                image: 'https://images.unsplash.com/photo-1590439471364-192aa70cf0b4?q=80&w=1000&auto=format&fit=crop'
            }
        ],
    },
    {
        id: '#OR-4570',
        date: 'Oct 15, 2023',
        total: '₹899.00',
        status: 'Approved',
        subtotal: '₹800.00',
        deliveryFee: '₹50.00',
        tax: '₹49.00',
        items: [
            {
                id: 4,
                name: 'Lavender Luxury',
                price: '₹200.00',
                quantity: 4,
                weight: '200g',
                image: 'https://images.unsplash.com/photo-1546552356-3fae876a61ca?q=80&w=1000&auto=format&fit=crop'
            }
        ],
    }
];
