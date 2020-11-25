import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { startWith } from 'rxjs/operator/startWith';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  item = {'name':'', 'quantity':1};
  title = "Add Grocery";
  selectCount = Array(12).fill(0, 0).map((_, idx) => 1 + idx);
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
  }
  cancelModal(){
    this.view.dismiss();
  }
  submitData(){
    this.view.dismiss(this.item);
  }
  ionViewWillLoad() {
    this.item = this.navParams.get("data");
    this.title = this.item.name === ''?"Add Grocery": "Edit Grocery";
  }
}
