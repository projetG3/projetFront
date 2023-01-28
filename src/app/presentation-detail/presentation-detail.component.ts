import { Presentation } from './../models/presentation';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresentationService } from '../services/presentation/presentation.service';

@Component({
  selector: 'app-presentation-detail',
  templateUrl: './presentation-detail.component.html',
  styleUrls: ['./presentation-detail.component.css'],
})
export class PresentationDetailComponent {
  id: any;
  presentation!: Presentation;
  constructor(
    private activatedRoute: ActivatedRoute,
    private presentationService: PresentationService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      try {
        var id = paramMap.get('id');
        if (id != null) {
          this.presentation =
            await this.presentationService.getPresentationById(+id);
        }
      } catch (error) {
        console.log("L'erreur " + error);
      }
    });
  }

  objectToLiterral(object:any){
    return JSON.stringify(object);
  }

  parseJson(json: string) {
    try {
      const parsedJson = JSON.parse(json);
      return parsedJson[0];
    } catch (e) {
      console.log(e)
      return json;
    }
  }

}
