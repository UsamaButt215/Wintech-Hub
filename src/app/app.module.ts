import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { SliderComponent } from './slider/slider.component';
import { CountdownOfferComponent } from './countdown-offer/countdown-offer.component';
import { ProductAreaComponent } from './product-area/product-area.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopComponent } from './shop/shop.component';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { RechargeScreenComponent } from './recharge-screen/recharge-screen.component';
import { LoginComponent } from './login/login.component';
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { AboutUsComponent } from './about-us/about-us.component';
import { PoliciesComponent } from './policies/policies.component';
import { RechargeComponent } from './recharge/recharge.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsletterComponent,
    SliderComponent,
    CountdownOfferComponent,
    ProductAreaComponent,
    ContactComponent,
    CartComponent,
    CheckoutComponent,
    ShopComponent,
    DetailsComponent,
    RechargeScreenComponent,
    LoginComponent,
    MainlayoutComponent,
    AboutUsComponent,
    PoliciesComponent,
    RechargeComponent
  ],
  imports: [
    GooglePayButtonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'timer' })
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
