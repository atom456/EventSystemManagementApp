import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

describe('AppComponent', () => {
  const mockedComponents = [
    MockComponent(HeaderComponent),
    MockComponent(FooterComponent),
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ...mockedComponents],
      declarations: [AppComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
