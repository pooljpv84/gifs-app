import {Component, Input, OnInit} from '@angular/core';
import {timeout} from 'rxjs';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public imageUrl!: string;

  @Input()
  public alt: string = '';

  public hasLoaded = false;

  ngOnInit(): void {
    if (!this.imageUrl) throw new Error('No image url');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);

  }
}
