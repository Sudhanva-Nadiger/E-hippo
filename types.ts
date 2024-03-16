export interface Billboard {
    id: number
    label: string
    imageUrl: string
}

export interface Category {
    id: number
    name: string
    billBoardId: number
}

export interface Image {
    id: string
    url: string
}

export interface Size {
    id: number;
    name: string;
    value: string;
  };
  
  export interface Color {
    id: number;
    name: string;
    value: string;
  };

export interface Product {
    id: number
    name: string
    price: number
    images: Image[]
    category: Category
    isFeatured: boolean
    size: Size
    color: Color
}