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

  updateList(id: string, title: string) {
    //send a web request to update a list
    console.log('called in angular');
    return this.webRequestService.patch(`lists/${id}`, { title });

  }


  getLists() {
    return this.webRequestService.get('lists');
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }


  updateTask(listId: string, taskId: string, title: string) {
    //send a web request to update a list
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });

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
