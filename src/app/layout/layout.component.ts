import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent, FooterComponent } from '@akur8/shared-components';
import { PostsFacade } from '@akur8/state';

@Component({
    selector: 'akur8-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
    readonly postsFacade = inject(PostsFacade);

    ngOnInit(): void {
        this.postsFacade.init();
    }
}
