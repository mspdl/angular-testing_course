import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let element: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
    console.log();
  });

  it("should display the course list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const cards = element.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("Could not find cards");
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();
    const firstCourse = component.courses[0];
    const card = element.query(By.css(".course-card:first-child"));
    const title = card.query(By.css("mat-card-title"));
    const image = card.query(By.css("img"));

    expect(card).toBeTruthy("Could not find the first course card");
    expect(title.nativeElement.textContent).toBe(
      firstCourse.titles.description,
      "Title on template does not match with the data"
    );
    expect(image.nativeElement.src).toBe(
      firstCourse.iconUrl,
      "Image source on template does not match with the data"
    );
  });
});
