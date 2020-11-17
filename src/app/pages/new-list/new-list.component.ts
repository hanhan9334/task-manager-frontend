import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { RouterModule } from '@angular/router';
import { List } from 'src/app/models/list.model'

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(title: string) {
    this.taskService.createList(title).subscribe((list: List) => {
      console.log(list);
      //Navigate to "/lists/:id"
      this.router.navigate(['/lists', list._id]);

    });

  }
}
