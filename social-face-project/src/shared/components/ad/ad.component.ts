import { Component, Input } from '@angular/core';

import { Ad } from '../../interfaces/ad.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.scss'
})
export class AdComponent {
  @Input() ad: Ad | undefined;
}
