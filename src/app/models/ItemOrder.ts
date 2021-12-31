import { Title } from '@angular/platform-browser';
import { Product } from './Product';

export interface ItemOrder {
    id?: number,
    quantity?: number,
    product?: Product,
};