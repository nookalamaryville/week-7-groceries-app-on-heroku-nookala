import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery"
  items = [{name:"Eggs", quantity:2},
  {name:"Onions", quantity:1},
  {name:"Milk", quantity:1},
  {name:"Broccoli", quantity:3},
  {name:"Celery", quantity:2},
  {name:"Banana", quantity:6},
  {name:"Sweet Potato", quantity:5}]
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }
  removeItem(item, index){
    const toast = this.toastCtrl.create({
      message: 'Removing Item -' + item.name +', ' + item.quantity,
      duration: 3000
    });
    toast.present();
    this.items.splice(index, 1)
  }
  addItem(){
    this.showPrompt();
  }
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      message: "Please enter gorcery item...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            this.items.push(item);
          }
        }
      ]
    });
    prompt.present();
  }
}
