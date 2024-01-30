import { Component, OnInit } from '@angular/core';
import { ApiResponse, Unit } from 'src/app/models/unit';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  selectedHour: string = '';
  showClosedUnits: boolean = false;
  filteredUnits: Unit[] = [];

  constructor(private unitService: UnitsService) {}

  ngOnInit() {
    this.findUnits();
  }

  findUnits() {
    this.unitService.getUnits().subscribe({
      next: (response: ApiResponse) => {
        this.filteredUnits = response.locations;
  
        this.filteredUnits = this.filterUnitsByHour(this.filteredUnits, this.selectedHour);
  
        if (this.showClosedUnits) {
          this.filteredUnits = this.filteredUnits.filter(unit => !unit.opened);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  

  filterUnitsByHour(units: Unit[], selectedHour: string): Unit[] {
    if (!selectedHour) {
      return units;
    }

    const hourRanges: { [key: string]: { start: number; end: number } } = {
      'morning': { start: 6, end: 12 },
      'afternoon': { start: 12, end: 18 },
      'night': { start: 18, end: 23 }
    };

    const validHours = Object.keys(hourRanges);

    if (validHours.includes(selectedHour)) {
      const selectedRange = hourRanges[selectedHour];

      const filteredUnits = units.filter(unit => {
        if (unit.schedules && unit.schedules.length > 0) {
          const openingTime = parseInt(unit.schedules[0].hour.split(':')[0], 10);
          return openingTime >= selectedRange.start && openingTime <= selectedRange.end;
        }

        return false;
      });

      return filteredUnits;
    } else {
      return units;
    }
  }

  clearFilter() {
    this.selectedHour = '';
    this.showClosedUnits = false;
    this.findUnits();
  }
}
