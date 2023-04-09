import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderComponent } from './slider/slider.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [

{path:'index', component:SliderComponent },
{path:'contact', component:ContactComponent },
{path:'cart', component:CartComponent },
{path:'shop', component:ShopComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
