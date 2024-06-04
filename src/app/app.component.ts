import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgForOf} from "@angular/common";
import {ModulesService} from "./services/modules.service";
import {HttpClientModule} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {ModuleType} from "./types/module.type";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'fileExplorer';

  constructor(
    private modulesService: ModulesService
) {
  }

  parentId: number = 0;
  modules: ModuleType[] =  [];

  parentFolder: number = 0;

  enable: boolean = false;

  ngOnInit() {
    this.getModules();
  }

  public getModules() {
    this.modulesService.getModules()
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          // Handle error gracefully (e.g., display error message to user)
          return throwError(error); // Re-throw for further handling
        })
      )
      .subscribe(response => {
        this.modules = response;
      });
  }


  openFolder(module: ModuleType) {
    if (module.type != 2){
      window.open(module.url, '_blank');    }
    else if (module.type == 2) {

      this.modulesService.getChilds(module.id).pipe().subscribe(
        response => {
          this.modules = response;
          this.parentId = module.id;
          this.parentFolder = module.parentId;
          this.enable = true;
          console.log(this.parentFolder)
        }
      )
    }
  }

  returnFolder() {

    if (this.parentId == null){
      console.log("veio null")
      this.modulesService.getModules().pipe().subscribe(
        response => {
          this.modules = response;
        }
      )
    }else if (this.parentId != null){
      console.log("entrou" + this.parentFolder)
      this.modulesService.getByParentId(this.parentId).pipe().subscribe(
        response => {
          this.parentId = response;
          if (this.parentId == null){
            this.modulesService.getModules().pipe().subscribe(
              response => {
                this.modules = response;
              }
            )
          }else
          this.modulesService.getChilds(this.parentId).pipe().subscribe(
            response => {
              this.modules = response;

            }
          )
        }
      )


    }
  }
}
