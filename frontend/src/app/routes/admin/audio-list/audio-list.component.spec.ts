import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AudioListComponent } from './audio-list.component';

describe('AudioListComponent', () => {
  let component: AudioListComponent;
  let fixture: ComponentFixture<AudioListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
