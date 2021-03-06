import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoutePartsService } from '../router-parts.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  routeParts: any[];
  routerEventSub: Subscription;
  public isEnabled = true;
  constructor(
    private router: Router,
    private routePartsService: RoutePartsService,
    private activeRoute: ActivatedRoute
  ) {
    this.routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);

    this.routerEventSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((routeChange) => {
        this.routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        // generate url from parts
        this.routeParts.reverse().map((item, i) => {
          item.breadcrumb = this.parseText(item);
          item.urlSegments.forEach((urlSegment, j) => {
            if (j === 0) {
              return item.url = `${urlSegment.path}`;
            }
            item.url += `/${urlSegment.path}`;
          });
          if (i === 0) {
            return item;
          }
          // prepend previous part to current part
          item.url = `${this.routeParts[i - 1].url}/${item.url}`;

          return item;
        });
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }

  parseText(part) {
    if (!part.breadcrumb) {
      return ''
    }
    part.breadcrumb = part.breadcrumb.replace(/{{([^{}]*)}}/g, (a, b) => {
      const r = part.params[b];
      return typeof r === 'string' ? r : a;
    });
    return part.breadcrumb;
  }

}
