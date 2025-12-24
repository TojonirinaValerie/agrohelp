import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { City, Order, OrderItem, OrderList } from '../../models/order.model';
import { Observable } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatChipsModule
  ],
  providers:[DatePipe],
  templateUrl: 'orders.component.html',
  styleUrl: 'orders.component.css'
})
export class OrdersComponent implements OnInit {
  mailToUri: string = ''; 
  loading: boolean = false;
  orders$!: Observable<Order[]>;
  orders: Order[] = [];
  cities: City[] = [];
  orderList: OrderList[] = [];
  displayedColumns: string[] = ['customer', 'address', 'date', 'total', 'status', 'payment-status', 'actions', 'pdf', 'email', 'details'];
  
  constructor(private orderService: OrderService, private dialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.orderService.getOrders().then((data) => 
      data.subscribe(ord => {
        this.orders = ord.data.orders;
      })
    );

    this.orderService.getOrderList().then((dataOl) => 
      dataOl.subscribe(oL => {
        this.orderList = oL.data.orderList;
      })
    );

    this.orderService.getAllCity().then((dataCT) => 
      dataCT.subscribe(cT => {
        this.cities = cT.data.cities;
      })
    );
  }

  getCity(cityId: string): string | undefined {
    const city = this.cities.find(ct => ct.id === cityId);
    return city ? city.name : undefined;
  }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.orderService.putOrders(orderId, status).then(dataOrd => 
      dataOrd.subscribe(ord => {
        if(ord.success) {
          this.refresh();
          alert('Status updated with success');
        }
      })
    );
  }

  // getItems(id: string): string[] {
  //   let productItems: OrderList[];
  //   let output: string[] = [];
  //   const items = this.orderList.filter(oL => oL.order === id);
  //   productItems = items;

  //   for (const p of productItems) {
  //     output.push(`${p.product.name} | ${p.quantity}`);
  //   }
  //   return output;
  // }

  getItems(id: string): { items: OrderItem[], total: number} {
    let output: OrderItem[] = [];
    let total = 0;
    for (let p of this.orderList.filter(oL => oL.orderDetails.id === id)) {
      for(let item of p.items) {
        total += item.product.consumer_price * item.quantity;
        const orderItem: OrderItem = {
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          consumerPrice: item.product.consumer_price,
          retailerPrice: item.product.retailer_price,
        };
        output.push(orderItem);
      }
    }
    // item.slice(0, item.indexOf('|')).replace('|', '') 
    // item.slice(item.indexOf('|')).replace('|', '') 
    return { items: output, total};
  }

  openOrderDetailsDialog(orderId: string): void {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '600px',
      data: this.getItems(orderId) 
    });
  }

  generateInvoice(id: string) {
    this.loading = true;
    this.orderService.downloadInvoice(id).subscribe({
      next: (pdf: any) => {
        const fileURL = URL.createObjectURL(pdf);
        window.open(fileURL);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error generating PDF', err);
        this.loading = false;
      }
    });
  }

  sendInvoice(order: Order) {
    // your-component.ts
    const email = order.address.email;
    const subject = `Merci ! Votre commande n°${order.id} a bien été confirmée`;
    const message = `Bonjour ${
    order.address.fullName.replace(/\w\S*/g, txt =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )},

    Merci pour votre commande passée le ${this.datePipe.transform(order.createdAt, 'dd/MM/yyyy HH:mm')} chez Agrohelp-Consulting. Nous sommes ravis de vous compter parmi nos clients !
    
    Votre facture est prête
    Vous pouvez consulter ou télécharger votre facture au format PDF via le lien suivant :
    https://agrohelp-consulting.onrender.com/#/order/${order.id}

    Ce lien mène à une version en ligne sécurisée du document, que vous pouvez imprimer ou conserver en pièce justificative.
    `;

    this.mailToUri = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  
    window.location.href = this.mailToUri;
    // ou bien : window.open(this.mailToUri);
  }
 
}