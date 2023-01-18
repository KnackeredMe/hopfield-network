import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import { HopfieldNetworkComponent } from './components/hopfield-network/hopfield-network.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'hopfield-network', pathMatch: 'full'},
  {path: 'hopfield-network', component: HopfieldNetworkComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HopfieldNetworkComponent
  ],
    imports: [
        RouterModule.forRoot(
          appRoutes,
          {onSameUrlNavigation: 'reload'},
        ),
        BrowserModule,
        RouterOutlet
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
