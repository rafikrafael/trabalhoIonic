import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IncluirMedicamentoPage } from '../incluir-medicamento/incluir-medicamento';
import { ListarMedicamentosPage } from '../listar-medicamentos/listar-medicamentos';

import { TipoFiltragem } from '../../model/tipoFiltragem';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController) {

  }

  listarMedicamentos() {
    this.navCtrl.push(ListarMedicamentosPage, {tipoFiltragem: TipoFiltragem.tfTodos});
  }

  listarMedicamentosNaoVencidos() {
    this.navCtrl.push(ListarMedicamentosPage, {tipoFiltragem: TipoFiltragem.tfNaoVencidos});
  }

  listarMedicamentosVencidos() {
    this.navCtrl.push(ListarMedicamentosPage, {tipoFiltragem: TipoFiltragem.tfVencidos});
  }

  incluirMedicamento() {
    this.navCtrl.push(IncluirMedicamentoPage);
  }

}
