import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';

import { Ad } from '../../interfaces/ad.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.scss'
})
export class AdComponent implements OnInit {
  @Input() ad: Ad | null = null;
  @Input() public index: number = 0;

  public elementId: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.elementId.update(() => `ad-container-${this.index}`);
  }
}
