import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MaterializeService } from '../../services/materialize.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('fixedFloatingBtn') floatingBtnRef: ElementRef;

  menuItems: {
    url: string,
    name: string
  }[] = [
    { url: '/overview', name: 'Overview' },
    { url: '/analytics', name: 'Analytics' },
    { url: '/history', name: 'History' },
    { url: '/order', name: 'Add order' },
    { url: '/categories', name: 'Categories' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    MaterializeService.initFloatingActionButton(this.floatingBtnRef);
  }

  logOut(event: Event) {
    event.preventDefault();

    this.authService.logOut();
    this.router.navigate(['/login']).then(() => {});
  }

}
