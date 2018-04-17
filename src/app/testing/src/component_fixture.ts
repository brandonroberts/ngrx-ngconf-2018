import {
  NO_ERRORS_SCHEMA,
  Type,
  InjectionToken,
  ComponentRef,
} from '@angular/core';
import {
  TestBed,
  TestModuleMetadata,
  ComponentFixture,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export interface ComponentTestFixture<T> {
  compile(componentParameters?: Partial<T>): Promise<void>;
  detectChanges(checkNoChanges?: Boolean): void;
  get(type: Type<any> | InjectionToken<any>): any;
  readonly instance: T;
  readonly componentInstance: T;
  readonly componentRef: ComponentRef<T>;
}

export function createComponentFixture<T>({
  module: sourceModule,
  component,
  shallow = true,
  ...testModuleMetadata
}: TestModuleMetadata & {
  module?: NodeModule;
  component: Type<T>;
  shallow?: boolean;
}): ComponentTestFixture<T> {
  let componentFixture: ComponentFixture<T> | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [shallow ? NO_ERRORS_SCHEMA : []],
      declarations: [component, testModuleMetadata.declarations || []],
      providers: testModuleMetadata.providers,
      imports: [NoopAnimationsModule, ...(testModuleMetadata.imports || [])],
    });
  });

  afterEach(() => {
    componentFixture = null;
  });

  return {
    async compile(componentParameters: Partial<T> = {}, detectChanges = true) {
      await TestBed.compileComponents();
      componentFixture = TestBed.createComponent(component);
      for (let p in componentParameters) {
        componentFixture.componentInstance[p] = componentParameters[p] as any;
      }

      if (detectChanges) {
        componentFixture.detectChanges();
      }
    },
    detectChanges(checkNoChanges: boolean = true) {
      if (!componentFixture) {
        throw attemptedTo('detect changes');
      }

      componentFixture.detectChanges(checkNoChanges);
    },
    get<V>(type: Type<V> | InjectionToken<V>): V {
      return TestBed.get(type);
    },
    get instance() {
      if (!componentFixture) {
        throw attemptedTo('access component instance');
      }

      return componentFixture.componentInstance;
    },
    get componentInstance() {
      if (!componentFixture) {
        throw attemptedTo('access component instance');
      }

      return componentFixture.componentInstance;
    },
    get componentRef() {
      if (!componentFixture) {
        throw attemptedTo('snapshot component fixture');
      }

      return componentFixture.componentRef;
    },
  };
}

function attemptedTo(verb: string) {
  return new Error(
    `Attempted to ${verb} before compiling the component fixture`
  );
}
