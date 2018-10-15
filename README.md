# Angular Patient CRUD application with Aidbox


### Install backend

Visit to [Aidbox
documentation](https://docs.aidbox.app/installation/setup-aidbox.dev) for
detailed information and instruction how to install Aidbox for development

### Clone repository

``` bash
 $ git clone https://github.com/HealthSamurai/aidbox-angular-sample.git
 $ cd aidbox-angular-sample

```

###  Configure Base URL

__Aidbox.Dev__

If you use Aidbox.Dev as a backend, you need specify `AIDBOX_URL` http://localhost:8888

``` typescript
export const environment = {
  AIDBOX_URL : "http://localhost:8888"
}
```

__Aidbox.Coud__

When you want run this sample application with Aidbox.Cloud you need
specify `AIDBOX_URL` as https://<YOUR_BOX_NAME>.aidbox.app.

``` typescript
export const environment = {
  AIDBOX_URL : "https://<YOUR_BOX_NAME>.aidbox.app"
}
```

### Requirements

This sample application required minimal [Node JS version 8.9](https://nodejs.org/en/)


### Installation and start

``` bash
 $ npm install
 $ npm install -g @angular/cli 
 $ ng serve

```

Open in browser [http://localhost:4200](http://localhost:4200)

![asset/img/screen.png](https://github.com/HealthSamurai/Aidbox-angular-sample/blob/master/src/assets/screen.png)



