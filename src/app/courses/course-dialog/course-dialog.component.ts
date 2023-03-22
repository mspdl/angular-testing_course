import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as moment from "moment";
import { tap } from "rxjs/operators";
import { Course } from "../model/course";
import { CoursesService } from "../services/courses.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
})
export class CourseDialogComponent implements OnInit {
  course: Course;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: Course,
    private coursesService: CoursesService
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.titles.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.titles.longDescription, Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    const val = this.form.value;

    this.coursesService
      .saveCourse(this.course.id, {
        titles: {
          description: val.description,
          longDescription: val.longDescription,
        },
      })
      .pipe(tap(() => this.dialogRef.close(this.form.value)))
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
