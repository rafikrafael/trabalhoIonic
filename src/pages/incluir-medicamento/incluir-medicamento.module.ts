import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncluirMedicamentoPage } from './incluir-medicamento';

@NgModule({
  declarations: [
    IncluirMedicamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(IncluirMedicamentoPage),
  ],
})
export class IncluirMedicamentoPageModule {}
