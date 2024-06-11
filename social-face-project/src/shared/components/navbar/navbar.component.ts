import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';

import { BreakpointObserver } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../modules/material-components.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialComponentsModule, AsyncPipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private breakpointObserver: BreakpointObserver) { }

  /**
   *  Method in charge of determining if the menu should be displayed
   * based of the window width
   * @returns Observable<boolean>
   */
  public shouldDisplayMenu(): Observable<boolean> {
    return this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(map(({ matches }) => (matches ? true : false)));
  }
}
