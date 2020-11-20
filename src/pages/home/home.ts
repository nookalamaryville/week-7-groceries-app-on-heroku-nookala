import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { GroceryServiceProvider } from '../../providers/grocery-service/grocery-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery"
  
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public dataService: GroceryServiceProvider, public inputDialogService: InputDialogServiceProvider, public socialSharing: SocialSharing) {

  }
  loadItems(){
    return this.dataService.getItems();
  }
  addItem(){
    this.inputDialogService.showItemPrompt();
  }  
  editItem(item, index){
    console.log("Edit Item - " + item);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showItemPrompt(item, index);
  }
  addModalItem(){
    this.inputDialogService.showModalPrompt();
  }
  editModalItem(item, index){
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.inputDialogService.showModalPrompt(item, index);
  }
  shareItem(item, index){
    console.log("Sharing Item - " + item, index);
    const toast = this.toastCtrl.create({
      message: 'Sharing Item - ' + item.name +', ' + item.quantity,
      duration: 3000
    });
    toast.present();
    let message = "Grocery item - Name: " + item.name + " - Quantity: " + item.quantity;
    let subject = "Shared via groceries app"
    this.socialSharing.share(message, subject).then(() => {
      console.log("Shared Successfully!");
    }).catch(()=>{
      console.log("Sorry, error while sharing.")
    })
  }
  removeItem(item, index){
    console.log("Removing Item - " + item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item - ' + item.name +', ' + item.quantity,
      duration: 3000
    });
    toast.present();
    this.dataService.removeitem(index);
  }
}
