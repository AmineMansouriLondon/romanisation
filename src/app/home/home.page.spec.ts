import { componentFactoryName } from '@angular/compiler';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('roman conversion object list should be filled', () => {
    expect(component).toBeDefined();
  });

  it('click audio should load', () => {
    expect(component.click).toBeDefined();
  });

  it('should check for faulty roman numeral'), () => {
    component.roman = 'VZ';
    component.checker();
    const alert = jasmine.createSpyObj('AlertController', ['create']);
    expect(alert.create).toHaveBeenCalledWith('You can only use roman numeral letters!')
  }

  it('should check for a number over 3999'), () => {
    component.number = 4000;
    component.checker();
    const alert = jasmine.createSpyObj('AlertController', ['create']);
    expect(alert.create).toHaveBeenCalledWith('You can only use numbers less than 3999!');
  }

  it('should make sure that input is a number'), () => {
    component.number = 'test';
    component.checker();
    const alert = jasmine.createSpyObj('AlertController', ['create']);
    expect(alert.create).toHaveBeenCalledWith('You can only use numbers here!');
  }

  it('should convert roman numeral to number'), () => {
    component.convert_dir = 'rom-num';
    component.roman = 'VII';
    component.convert();
    const res = component.number;
    expect(res).toEqual(7);
  }

  it('should convert number to roman numeral'), () => {
    component.convert_dir = 'num-rom';
    component.roman = 7;
    component.convert();
    const res = component.roman;
    expect(res).toEqual('VII');
  }

  it('should play intro'), () => {
    component.playIntro();
    let dur = component.intro.duration();
    expect(dur).toBeGreaterThan(0);
  }


});
