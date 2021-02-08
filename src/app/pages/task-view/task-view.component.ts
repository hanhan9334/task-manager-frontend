import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { Params } from '@angular/router';
import { of } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedListId = params.listId;
        this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        });

      }
    );

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    });
  }

  onTaskClick(task: Task) {
    //Set task to complete
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed")
      //Once the task is set to completed, update it 
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((response: any) => {
      this.router.navigate(['/lists']);
      console.log(response);
    });
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((response: any) => {
      this.tasks=this.tasks.filter(val=>val._id!==id);
      this.router.navigate(['/lists', this.selectedListId]);
      console.log(response);
    });
  }


}
