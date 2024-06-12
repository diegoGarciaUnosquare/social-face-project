import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MaterialComponentsModule } from '../../modules/material-components.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialComponentsModule, AsyncPipe, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private ngZone: NgZone,
    private router: Router
  ) { }

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

  public navigateTo(route: string): void {
    this.ngZone.run(() => {
      this.router.navigate([route]);
    });
  }
}
