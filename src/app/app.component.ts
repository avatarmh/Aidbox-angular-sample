import { Component } from '@angular/core';
import { Patient } from './patient';
import { PatientService } from './patient.service';
import { Observable } from 'rxjs';
import { PatientState } from './reducer/patient';
import { Store, select } from '@ngrx/store';
import { AppState } from './reducer';

import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';

import { environment } from '../../environment';


import util from 'util';

const authConfig: AuthConfig = {

  issuer: environment.AIDBOX_URL,

  redirectUri: window.location.origin,

  clientId: 'SPA',

  scope: 'openid profile',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';


  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
    this.oauthService.tryLogin({
        onTokenReceived: (info) => {
            console.debug('state', info.state);
        }
    });
    if (!this.oauthService.getAccessToken())
      this.oauthService.initImplicitFlow();
  }


  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.oidc = false;
    this.oauthService.loginUrl = environment.AIDBOX_URL + '/oauth2/authorize';
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    // this.oauthService.loadDiscoveryDocumentAndLogin();
  }

}
