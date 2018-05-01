# DmnJsAngularStack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
## Steps to integrate dmn-js:

## step1: 
//

	npm i --save-dev babel-plugin-inferno babel-plugin-transform-object-rest-spread babel-plugin-transform-class-properties babel-plugin-transform-object-assign

//
	
	npm i --save-dev babel-plugin-inferno

	npm install --save-dev babel-loader babel-core babel-preset-env webpack

	npm install --save-dev babel-preset-react

	npm install --save-dev babel-preset-stage-0

	npm install --save-dev babel-preset-es2015

	npm install --save dmn-js


## step2:
in webpack.config.js
	      
              //modules.export = {
	              module: {
                             rules:{
					    { test: /\.js$/, 
					    exclude: /node_modules\/(?!(dmn-js|dmn-js-drd|dmn-js-shared|dmn-js-decision-table|table-js|dmn-js-literal-expression|diagram-js)\/).*/,
					    loader: 'babel-loader',query: {presets: ["react","es2015","stage-0"]}
					    }
                    rest of things
                    }
            }
        }


## step3:
   // this is for viewer // you can add modeler css as well
    //stylesheets: 
  	
	 <link rel="stylesheet" href="https://unpkg.com/dmn-js@4.3.0/dist/assets/dmn-js-drd.css">
   	
   	 <link rel="stylesheet" href="https://unpkg.com/dmn-js@4.3.0/dist/assets/dmn-js-decision-table.css">
   
   	 <link rel="stylesheet" href="https://unpkg.com/dmn-js@4.3.0/dist/assets/dmn-js-literal-expression.css">
   
   	<link rel="stylesheet"  href="https://unpkg.com/dmn-js@4.3.0/dist/assets/dmn-font/css/dmn.css">
   

## step4:
Index.html
//

	<body >
		<div class="canvas" style="width:100vh;height:100vh ;padding-left:100px"></div>
	</body>

## step-5:
In typings.d.ts
//

	declare module 'dmn-js';

## step6:
app.component.ts
//

    import Viewer from 'dmn-js';

    //in the class
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


