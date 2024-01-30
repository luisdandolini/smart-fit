import { ApiResponse } from './../../models/unit';
import { Component } from '@angular/core';
import { Unit } from 'src/app/models/unit';
import { UnitsService } from 'src/app/services/units.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  
  units: Unit[] = [];

  constructor(private unitService: UnitsService) {
    this.listUnits();
   }

   listUnits() {
    this.unitService.getUnits().subscribe({
      next: (response: ApiResponse) => {
        this.units = response.locations;

        console.log(this.units);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  formatUnitContent(content: string) {
    const cleanedContent = content?.replace(/<[^>]*>/g, '');
    return cleanedContent?.replace(/d&#8217;|&#8211;/g, '');
  }
  
  
}
