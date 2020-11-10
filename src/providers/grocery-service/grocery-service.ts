import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GroceryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GroceryServiceProvider {
   items = [];
  // [{name:"Eggs", quantity:2},
  // {name:"Onions", quantity:1},
  // {name:"Milk", quantity:1},
  // {name:"Broccoli", quantity:3},
  // {name:"Celery", quantity:2},
  // {name:"Banana", quantity:6},
  // {name:"Sweet Potato", quantity:5}]
  constructor() {
    console.log('Hello GroceryServiceProvider Provider');
  }
  getItems(){
    return this.items;
  }
  removeitem(index){
    this.items.splice(index, 1);
  }
  addItem(item){
    this.items.push(item);
  }
  editItem(item, index){
    this.items[index]= item;
  }
}
