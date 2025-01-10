import {Component, Input, OnInit} from '@angular/core';

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

  onLoad()
  {
    console.log('Image loaded');
    this.hasLoaded = true;
  }
}
