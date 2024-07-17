import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAnimeModalComponent } from './search-anime.modal.component';

describe('CreatePostModalComponent', () => {
  let component: SearchAnimeModalComponent;
  let fixture: ComponentFixture<SearchAnimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAnimeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAnimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
