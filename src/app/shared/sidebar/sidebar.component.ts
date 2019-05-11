import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  nombre:string;
  subscription:Subscription = new Subscription();

  constructor(public authService:AuthService,
              private store:Store<AppState>,
              public ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
        .pipe(
          filter(auth=> auth.user !=null)
        )
        .subscribe(auth => this.nombre = auth.user.nombre);
  }
  logout(){
    this.authService.logout();
    this.ingresoEgresoService.cancelarSubcriptions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
