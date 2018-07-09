import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Database } from '../../data/database';
import { Medicamento } from '../../model/medicamento';
import { TipoFiltragem } from '../../model/tipoFiltragem';

/**
 * Generated class for the ListarMedicamentosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listar-medicamentos',
  templateUrl: 'listar-medicamentos.html',
})

export class ListarMedicamentosPage {
  pageTitle: string = 'Lista de Medicamentos';
  medicamentos: Medicamento[];
  tipoFiltragem: TipoFiltragem = TipoFiltragem.tfNaoVencidos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public database: Database
  ) {
    this.tipoFiltragem = this.navParams.get('tipoFiltragem');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarMedicamentosPage');
    this.listarMedicamentos();
  }

  delegateTipoFiltragem() {
    switch (this.tipoFiltragem) {
      case TipoFiltragem.tfTodos:
        this.pageTitle = 'Todos os Medicamentos';
        return this.database.buscarTodosMedicamentos();
      case TipoFiltragem.tfVencidos:
        this.pageTitle = 'Vencidos';
      return this.database.buscarTodosMedicamentosVencidos();
      default:
        this.pageTitle = 'Não Vencidos';
      return this.database.buscarTodosMedicamentosNaoVencidos();
    }
  }

  listarMedicamentos() {
    this.delegateTipoFiltragem()
      .subscribe(
      data => {
        this.medicamentos = data;
        console.log(data);

      },
      error => {
        console.log(error);
    });
  }

  excluirMedicamento(id: number) {
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Confirma a exclusão do medicamento',
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            this.doExcluirMedicamento(id);
          }
        }
      ]
    });
    confirm.present();
  }

  doExcluirMedicamento(id: number) {
    if (this.database.deletarMedicamento(id)) {
      this.listarMedicamentos();
    }
  }

}
