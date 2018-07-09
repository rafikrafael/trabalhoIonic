import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Database } from '../../data/database';
import { Medicamento } from '../../model/medicamento';

/**
 * Generated class for the IncluirMedicamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incluir-medicamento',
  templateUrl: 'incluir-medicamento.html',
})
export class IncluirMedicamentoPage {
  medicamento: Medicamento = new Medicamento();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public database: Database) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IncluirMedicamentoPage');
  }

  salvarMedicamento() {
    this.database.adicionarMedicamento(this.medicamento);
    this.cancelarVoltar();
  }

  cancelarVoltar() {
    this.navCtrl.pop();
  }
}
