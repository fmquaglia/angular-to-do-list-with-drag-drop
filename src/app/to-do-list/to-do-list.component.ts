import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Item } from "../item";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.scss"]
})
export class ToDoListComponent implements OnInit {
  todoForm: FormGroup;

  items: Item[] = [
    { description: "Clone the Angular Repo", done: false },
    { description: "Analyze the Angular Project", done: false },
    { description: "Create the Vue Repo", done: false },
    { description: "Migrate the Angular code to Vue", done: false },
    { description: "Publish the Vue Repo", done: false }
  ];
  done: Item[] = [];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ["", Validators.required]
    });
  }

  addItem(description: string) {
    this.items.unshift({
      description,
      done: false
    });
  }

  deleteItem(item: any) {
    this.items.splice(item, 1);
  }

  deleteDoneItem(item: any) {
    this.done.splice(item, 1);
  }

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
