import { Component, Input } from '@angular/core';
import { Unit } from 'src/app/models/unit';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() units: Unit[] = [];

  constructor() { }

  formatUnitContent(content: string) {
    const cleanedContent = content?.replace(/<[^>]*>/g, '');
    return cleanedContent?.replace(/d&#8217;|&#8211;/g, '');
  }
}
