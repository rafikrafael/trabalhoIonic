import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarMedicamentosPage } from './listar-medicamentos';

@NgModule({
  declarations: [
    ListarMedicamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarMedicamentosPage),
  ],
})
export class ListarMedicamentosPageModule {}
