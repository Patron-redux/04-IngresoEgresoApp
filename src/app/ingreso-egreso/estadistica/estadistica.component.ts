import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import * as fromIngesoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  ingresos:number;
  egresos:number;
  cuantosIngresos:number;
  cuantosEgresos:number;

  subscription:Subscription= new Subscription();
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  constructor(private store:Store<fromIngesoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe( ingresoEgreso =>{
          this.contarIngresoEgreso(ingresoEgreso.items);
      });
  }
  contarIngresoEgreso(items:IngresoEgreso[]){
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;
    items.forEach(item=>{
      if(item.tipo === 'Ingreso'){
          this.cuantosIngresos ++;
          this.ingresos += item.monto;
      }else{
        this.cuantosEgresos ++;
        this.egresos  += item.monto;
      }
    });

    this.doughnutChartData = [[this.ingresos,this.egresos]];

  }

}
