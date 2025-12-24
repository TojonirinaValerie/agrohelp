import ProductType from '@/models/product-type';
import { getInvoice } from '@/service/invoice-generator';
import fs from 'fs/promises';
import path from 'path';

// Your provided types
export interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  barcode: string;
  in_stock: boolean;
  quantity: number;
  retailer_price: number;
  consumer_price: number;
  typeId: string;
  userId: string;
  image?: string;
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  city: string;
  address: string;
  phoneNumber: string;
  phoneNumberPay?: string;
  postalCode: string;
  notes?: string;
}

// The DeliveryOptions interface should match the one used in getInvoice()
interface DeliveryItem {
  name: string;
  type: string;
  qty: number;
  amount: number;
}

interface DeliveryOptions {
  logo: string;
  name: string;
  address1: string;
  address2: string;
  customerName: string;
  orderId: string;
  date: string;
  paymentTerms: string;
  balanceDue: number;
  total: number;
  notes: string;
  terms: string;
  items: DeliveryItem[];
}

export async function generateInvoiceFromCart(
  orderId: string,
  shippingDetails: ShippingDetails,
  cartItems: CartItem[]
): Promise<any> {
  const companyInfo = {
    logo: 'https://agrohelp-back.onrender.com/uploads/image-1752119807031-320472758.png',
    name: 'Agrohelp Consulting',
    address1: 'Tsiadana 101, Antananarivo, Madagascar ',
    address2: `${shippingDetails.city}, ${shippingDetails.postalCode}`,
    paymentTerms: 'Payable à réception',
    notes: shippingDetails.notes ?? 'Merci pour votre commande.!',
    terms: 'Veuillez payer à la livraison.',
  };

  const deliveryItems = await Promise.all(
    cartItems.map(async (item) => {
      const qty = item.quantity;
      let type = '';

      const productType = await ProductType.findByPk(item.product.typeId);
      if (productType) type = productType.name;

      const amount = item.product.consumer_price * qty;

      return {
        name: item.product.name,
        type,
        qty,
        amount,
      };
    })
  );

  const total = deliveryItems.reduce((sum, item) => sum + item.amount, 0);

  const deliveryOptions: DeliveryOptions = {
    logo: companyInfo.logo,
    name: companyInfo.name,
    address1: companyInfo.address1,
    address2: companyInfo.address2,
    customerName: shippingDetails.fullName,
    orderId: orderId,
    date: new Date().toISOString().split('T')[0],
    paymentTerms: companyInfo.paymentTerms,
    balanceDue: total,
    total: total,
    notes: companyInfo.notes,
    terms: companyInfo.terms,
    items: deliveryItems,
  };

  const pdfBuffer = await getInvoice(deliveryOptions);

  // Save to disk
  /*const invoicesDir = path.join(__dirname, '../../invoices');

  const outputPath = path.join(invoicesDir, `invoice-${orderId}.pdf`);
  await fs.writeFile(outputPath, pdfBuffer);*/

  return pdfBuffer;
}

