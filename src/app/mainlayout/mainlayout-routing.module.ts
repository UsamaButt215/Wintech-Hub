import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { ContactComponent } from '../contact/contact.component';
import { DetailsComponent } from '../details/details.component';
import { RechargeScreenComponent } from '../recharge-screen/recharge-screen.component';
import { ShopComponent } from '../shop/shop.component';
import { SliderComponent } from '../slider/slider.component';
import { MainlayoutComponent } from './mainlayout.component';

const routes = [
    {
        path: '' , component:MainlayoutComponent,
        children: [
            { path: '', component: SliderComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'cart', component: CartComponent },
            { path: 'shop', component: ShopComponent },
            { path: 'details', component: DetailsComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'recharge', component: RechargeScreenComponent },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainlayoutRoutingModule { }
