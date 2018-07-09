import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';

import { Medicamento } from '../model/medicamento';

@Injectable()
export class Database {

  options: any = {
    name: 'minhaFarmacinha.db',
    location: 'default',
    createFromLocation: 1
  }

  private db: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.connectDb();
  }

  private connectDb(): void {
    this.sqlite.create(this.options)
      .then((db: SQLiteObject) => {
        this.db = db;
        var sql = `
          CREATE TABLE IF NOT EXISTS medicamento (
            id INTEGER primary key,
            nome VARCHAR(255),
            dataVencimento date,
          )`;
        this.db.executeSql(sql, {})
          .then(() => console.log("SQL " + sql))
          .catch(e => console.log("Erro " + e));
      }).catch(e => console.log("Erro" + e));
  }

  adicionarMedicamento(medicamento: Medicamento): void {

    var sql = "INSERT INTO medicamento (nome,dataVencimento) VALUES ('" + medicamento.nome + "','" + medicamento.dataVencimento + "')";

    this.db.executeSql(sql, {})
      .then(() => console.log("SQL " + sql))
      .catch(e => console.log("Erro " + e));
  }

  buscarTodosMedicamentos() {
    return this.buscarMedicamentos('');
  }

  buscarTodosMedicamentosNaoVencidos() {
    return this.buscarMedicamentos(` dataVencimento >= date('now') `)
  }

  buscarTodosMedicamentosVencidos() {
    return this.buscarMedicamentos(` dataVencimento < date('now') `)
  }

  buscarMedicamentos(whereCondition: string) {
    var sql = "SELECT * FROM medicamento ";
    if (whereCondition != '') {
      sql += " WHERE " + whereCondition;
    }
    return Observable.create((observer) => {
      this.db.executeSql(sql, {})
        .then((result) => {
          console.log('result', result);

          let items: Medicamento[] = [];
          if (result.rows.length > 0) {
            for (var x = 0; x < result.rows.length; x++) {
              let medicamento: Medicamento = new Medicamento();
              medicamento.id = result.rows.item(x).id;
              medicamento.nome = result.rows.item(x).nome;
              medicamento.dataVencimento = result.rows.item(x).dataVencimento;
              items.push(medicamento);
            }
          }
          observer.next(items);
          observer.complete();
        })
        .catch(e => {
          console.log("Erro " + e);
          alert("Errorr " + e);
        });
    }, error => {
      alert("Errorr " + error);
    });

  }

  async deletarMedicamento(id: number) {
    const sql =
      ` DELETE FROM medicamento WHERE id = ${id} `;
    const situacao = await this.db.executeSql(sql, {id});
    if (situacao.error) {
      console.log('Erro ao excluir um medicamento, erro -> ', error);
      return false;
    }
    console.log('Medicamento removido com sucesso')
    return true;
      // .then(() => {
      //   console.log('Medicamento removido com sucesso')
      //   return true;
      // })
      // .catch((error) => {
      //   console.log('Erro ao excluir um medicamento, erro -> ', error);
      //   return false;
      // });
  }
}
