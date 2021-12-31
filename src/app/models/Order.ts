import { Title } from '@angular/platform-browser';
import { ItemOrder } from './ItemOrder';

export interface Order {
    id?: number,
    name?: string,
    state?: string,
    date?: string,
    customer?: string,
    cityTax?: number,
    countyTax?: number,
    stateTax?: number,
    federalTax?: number,
    totalTaxe?: number,
    totalAmount?: number,
    itemOrders?: ItemOrder[]
};