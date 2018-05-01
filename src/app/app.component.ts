import { Component } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import Viewer from 'dmn-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient ){
    this.http.get('../assets/val.xml',{responseType: 'text'}).subscribe(x=>{
     var xml= x; // my DMN 1.1 xml
     //var myContainer = document.getElementsByClassName('canvas');
    var viewer = new Viewer({
      container: '.canvas'
    });

    viewer.importXML(xml, function(err) {
     console.log('*********************');
      if (err) {
        console.log('error rendering', err);
      } else {
        viewer
        .getActiveViewer()
        .get('canvas')
          .zoom('fit-viewport');
      }
    });
    });
}
}
