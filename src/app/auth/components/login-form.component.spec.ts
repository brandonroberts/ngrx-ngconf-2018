import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { createComponentFixture } from 'angular-testing-library';
import { LoginFormComponent } from './login-form.component';

describe('TestComponent', () => {
  const fixture = createComponentFixture({
    component: LoginFormComponent
  });

  beforeEach(async() => {
    await fixture.compile();
  });

  it('should create', () => {
    expect(fixture).toMatchSnapshot();
  });
});
