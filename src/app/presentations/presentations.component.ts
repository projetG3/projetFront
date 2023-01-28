import { Component } from '@angular/core';
import { PresentationService } from '../services/presentation/presentation.service';
import { Presentation } from '../models/presentation';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css'],
})
export class PresentationsComponent {
  presentations: Array<Presentation> = [];
  presentationsId: Array<number> = [];
  first = 0;
  rows = 6;
  constructor(private presentation: PresentationService) {}

  ngOnInit() {
    this.presentationsId = [
      3939752, 2663325, 2663360, 3454977, 3007878, 3007879, 3007880, 3025153,
      5507078, 5507079, 5507081, 3016430, 3016431, 2697873, 2697896, 2697904,
      2697910, 3020803, 3411169, 3634892, 3953338, 5598893, 2192305, 5814196,
      3006798, 4980343, 4980366, 4980372, 3010880, 3989112, 3989141, 3454664,
      3812595, 3845063, 3014176, 3014177, 3416391, 5508287, 3696597, 2226926,
      2226932, 3998217, 3998223, 3533949, 4924451, 4189767, 4189773, 3967872,
      5561393, 3516069,
    ];

    this.presentationsId.forEach(async (id) => {
      try {
        let presentationObjet = await this.presentation.getPresentationById(id);
        this.presentations.push(presentationObjet);
      } catch (error) {
        console.log(error);
      }
    });
  }

  getListVoieAdministration(presentation: Presentation) {
    let s = '';
    presentation.codecis.administrepars.forEach(
      (admi) => (s += admi.voieadministration.id.toString() + ' ')
    );
    return s;
  }


  onPageChange(event: { first: number; }) {
    this.first = event.first;
  }
}
