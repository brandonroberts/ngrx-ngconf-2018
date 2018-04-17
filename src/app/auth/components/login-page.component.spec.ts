import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFixture, provideMagicalMock } from 'angular-testing-library';
import { LoginPageComponent } from './login-page.component';
import { LoginFormComponent } from './login-form.component';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../actions/auth.actions';

describe('Login Page Component', () => {
  const fixture = createComponentFixture({
    component: LoginPageComponent,
    declarations: [LoginFormComponent],
    providers: [
      provideMagicalMock(Store)
    ]
  });
  
  const error$ = new BehaviorSubject<string>('');
  const pending$ = new BehaviorSubject<boolean>(false);
  let store: Store<any>;

  beforeEach(async() => {
    await fixture.compile({
      error$,
      pending$
    });

    store = fixture.get(Store);    
  });

  it('should compile', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch an action when onLogin is called', () => {
    const credentials = {
      username: 'test',
      password: 'test'
    };

    fixture.instance.onLogin(credentials);

    expect(store.dispatch).toHaveBeenCalledWith(new Login(credentials));
  });
});
