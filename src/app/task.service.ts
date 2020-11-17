import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }
  createList(title: string) {
    //send a web request to create a list
    return this.webRequestService.post('lists', { title });
  }


  getLists() {
    return this.webRequestService.get('lists');
  }


  createTask(title: string, listId: string) {
    //send a web request to create a task
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  complete(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
