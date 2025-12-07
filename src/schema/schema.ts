export interface Books {
    _id: string;
    id: string;
    title: string;
    normalizedTitle: string;
    imageUrl: URL;
    category: string;
    prices: Price[];
    bestPrice: Price;
    maxDiscount: number;
    lastUpdated: Date;
}

export interface Price {
    site: string;
    siteName: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    url: URL;
    inStock: boolean;
}