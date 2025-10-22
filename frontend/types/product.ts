export interface Technology {
    id: number;
    name: string;
    image: string;
}

export interface Product {
    id: number,
    name: string,
    title: string
    path: string;
    brand_color: string,
    price: { regular: number, extended: number },
    technologies: Technology[],
}