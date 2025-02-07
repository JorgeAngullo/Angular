import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'peguis';
  isOpen = false;

  constructor(private router:Router){}

  Listar(){
    console.log("app.component listar");
    this.router.navigate(["list"]); // ver const routes: Routes de app-routing.module.ts
  }

  Nuevo(){
    console.log("app.component nuevo");
    this.router.navigate(["add"]); // ver const routes: Routes de app-routing.module.ts
  }

  Editar(){
    console.log("app.component editar");
    this.router.navigate(["edit"]); // ver const routes: Routes de app-routing.module.ts
  }
}
