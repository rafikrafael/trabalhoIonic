import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IncluirMedicamentoPage } from '../pages/incluir-medicamento/incluir-medicamento';
import { ListarMedicamentosPage } from '../pages/listar-medicamentos/listar-medicamentos';
import { Database } from '../data/database';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IncluirMedicamentoPage,
    ListarMedicamentosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IncluirMedicamentoPage,
    ListarMedicamentosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    Database,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
