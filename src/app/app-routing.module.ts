import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
     
    {
        path:'',
        pathMatch:'full',
        redirectTo:'products'
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
    },
   {
     path: 'auth',
     loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)
   },
    {
     path:'cart',
     loadChildren:()=>import('./cart/cart.module').then(m=>m.CartModule)
    },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
