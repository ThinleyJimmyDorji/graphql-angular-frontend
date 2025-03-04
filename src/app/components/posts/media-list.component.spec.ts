import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListComponent } from './media-list.component';

describe('PostsComponent', () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
