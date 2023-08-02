import {NgModule} from '@angular/core'
import {ExtraOptions, RouterModule, Routes} from '@angular/router'

const routerOptions: ExtraOptions = {
  scrollOffset: [0, 0],
  scrollPositionRestoration: 'enabled',
}

const routes: Routes = []

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
