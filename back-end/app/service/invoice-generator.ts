import { rejects } from 'assert';
import HTMLToPDF from 'convert-html-to-pdf';

export interface DeliveryItem {
  name: string;
  type: string;
  qty: number;
  amount: number;
}

export interface DeliveryOptions {
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

function getDeliveryItemsHTML(items: DeliveryItem[]): string {
  return items
    .map(
      (item) => `
      <tr class="table-row">
        <td class="table-cell w-full font-bold text-left">${item.name}</td>
        <td class="table-cell w-full text-left">${item.type}</td>
        <td class="table-cell w-full text-center">${item.qty}</td>
        <td class="table-cell w-full text-left">MGA ${item.amount}</td>
      </tr>
    `
    )
    .join('');
}

function getDeliveryHTML(options: DeliveryOptions): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Facture</title>
  <style>
    /* Tailwind base inline (truncated here for brevity) */
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
    .table { display: table; width: 100%; }
    .table-row { display: table-row; }
    .table-cell { display: table-cell; padding: 8px; border-bottom: 1px solid #ddd; }
    .table-header-group { font-weight: bold; background-color: #058F00; color: white; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .text-left { text-align: left; }
    .font-bold { font-weight: bold; }
    .py-1 { padding-top: 4px; padding-bottom: 4px; }
    .py-2 { padding-top: 8px; padding-bottom: 8px; }
    .px-4 { padding-left: 16px; padding-right: 16px; }
    .pt-20 { padding-top: 80px; }
    .pb-2 { padding-bottom: 8px; }
    .text-xl { font-size: 20px; }
    .text-4xl { font-size: 36px; }
  </style>
</head>
<body>
  <div style="padding: 40px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between;">
      <div>
        <img src="${options.logo}" alt="Logo" style="height: 75px;" />
        <div style="margin-top: 20px;">
          <div><strong>${options.name}</strong></div>
          <div>${options.address1}</div>
          <div>${options.address2}</div>
        </div>
        <div style="margin-top: 20px;">
          <div style="color: gray;">À l’attention de:</div>
          <div><strong>${options.customerName}</strong></div>
        </div>
      </div>
      <div style="text-align: right;">
        <h1 class="text-4xl">Facture</h1>
        <div style="color: gray;">N° ${options.orderId}</div>
        <div style="margin-top: 40px;">
          <div>${options.date}</div>
          <div>${options.paymentTerms}</div>
          <div><strong>Reste à payer:</strong></div>
          <div>MGA ${options.balanceDue}</div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <table class="table" style="margin-top: 40px;">
      <thead class="table-header-group">
        <tr class="table-row">
          <th class="table-cell w-full text-center">Produit</th>
          <th class="table-cell w-full text-center">Type</th>
          <th class="table-cell w-full text-center">Quantité</th>
          <th class="table-cell w-full text-center">Prix</th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        ${getDeliveryItemsHTML(options.items)}
      </tbody>
    </table>

    <!-- Total -->
    <div style="margin-top: 40px; text-align: right;">
      <strong>Total:</strong> MGA ${options.total}
    </div>

    <!-- Notes & Terms -->
    <div style="margin-top: 40px;">
      <div style="color: gray;">Notes:</div>
      <div>${options.notes}</div>
    </div>
    <div style="margin-top: 20px;">
      <div style="color: gray;">Conditions:</div>
      <div>${options.terms}</div>
    </div>
  </div>
</body>
</html>
`;
}

export async function getInvoice(options: DeliveryOptions): Promise<Buffer> {
    return new Promise(async (resolve,reject) => {
        try {
            const html = getDeliveryHTML(options);

            const htmlToPDF = new HTMLToPDF(html, {
                waitForNetworkIdle: true,
                browserOptions: {
                defaultViewport: { width: 1920, height: 1080 },
                timeout: 60000
                },
                pdfOptions: {
                height: 1200,
                width: 900
                },
            });

            const pdfBuffer = await htmlToPDF.convert(); 

            if (!pdfBuffer || !Buffer.isBuffer(pdfBuffer) || pdfBuffer.length < 1000) {
              throw new Error("Invalid or empty PDF buffer generated");
            }
            resolve(pdfBuffer);
        } catch (error) {
            reject(error);
        }
    });
}
