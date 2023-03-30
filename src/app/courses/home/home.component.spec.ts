import { DebugElement } from "@angular/core";
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  waitForAsync,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { setupCourses } from "../common/setup-test-data";
import { click } from "../common/test-utils";
import { CoursesModule } from "../courses.module";
import { CoursesService } from "../services/courses.service";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let debugElement: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category === "BEGINNER"
  );
  const advancedCourses = setupCourses().filter(
    (course) => course.category === "ADVANCED"
  );

  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
      "findAllCourses",
    ]);

    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [{ provide: CoursesService, useValue: coursesServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();
    const tabs = debugElement.queryAll(By.css(".mdc-tab"));

    expect(tabs.length).toBe(2, "Unexpected number of tabs found");
  });

  it("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = debugElement.queryAll(By.css(".mdc-tab"));
    const advancedTab = tabs[1];
    click(advancedTab);
    fixture.detectChanges();

    flush();
    fixture.detectChanges();

    const cardTitles = debugElement.queryAll(By.css("mat-card-title"));
    expect(cardTitles.length).toBeGreaterThan(0, "Could not find card titles");
    expect(cardTitles[0].nativeElement.textContent).toContain(
      "Angular Security Course"
    );
  }));
});
