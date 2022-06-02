import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './main-page/home-page/home-page.component';
import { HomeCardComponent } from './main-page/home-page/home-card/home-card.component';
import { ProfileCardComponent } from './side-nav/profile-card/profile-card.component';
import { RouterModule,Routes } from '@angular/router';
import { LoadUserService } from './side-nav/load-user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login/login.service';
import { ProfileInfoService } from './profileInfo.service';
import { SignupService } from './signup/signup.service';
import { PostCallService } from './postcall.service';
import { PoststorageService } from './poststorage.service';
import { CategoryPageComponent } from './main-page/category-page/category-page.component';
import { CategoryCardComponent } from './main-page/category-page/category-card/category-card.component';
import { PathBackService } from './path-back.service';
import { CurrentPostService } from './current-post.service';
import { DetailPageComponent } from './main-page/detail-page/detail-page.component';
import { HomeFeatureComponent } from './main-page/home-feature/home-feature.component';
import { CatelogBoxComponent } from './main-page/home-feature/catelog-box/catelog-box.component';
import { CatelogCardComponent } from './main-page/home-feature/catelog-box/catelog-card/catelog-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './main-page/home-feature/slider/slider.component';
import { SearchComponent } from './main-page/search/search.component';
import { PostSearchService } from './post-search.service';
import { SearchCardComponent } from './main-page/search/search-card/search-card.component';
import { SliderCallService } from './slidercall.service';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from 'ckeditor4-angular';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminSideNavComponent } from './admin/admin-side-nav/admin-side-nav.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminMainAreaComponent } from './admin/admin-main-area/admin-main-area.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { AdminProfileComponent } from './admin/admin-side-nav/admin-profile/admin-profile.component';
import { AdminLoginService } from './admin/admin-login/admin-login.service';
import { ProfileAdminInfoService } from './admin/profile-admin-info.service';
import { PostPageComponent } from './admin/admin-main-area/post-page/post-page.component';
import { UserAdminComponent } from './admin/admin-main-area/user-admin/user-admin.component';
import { UserGuestComponent } from './admin/admin-main-area/user-guest/user-guest.component';
import { SliderPageComponent } from './admin/admin-main-area/slider-page/slider-page.component';
import { NotificationPageComponent } from './admin/admin-main-area/notification-page/notification-page.component';
import { AdsComponent } from './admin/admin-main-area/ads/ads.component';
import { CategorySettingComponent } from './admin/admin-main-area/category-setting/category-setting.component';
import { PostAddComponent } from './admin/admin-main-area/post-page/post-add/post-add.component';
import { PostEditComponent } from './admin/admin-main-area/post-page/post-edit/post-edit.component';
import { PostSendService } from './admin/admin-main-area/post-page/post-add/post-send.service';
import { CurrentEditPostService } from './admin/admin-main-area/post-page/post-edit/current-editPost.service';
import { PostEditService } from './admin/admin-main-area/post-page/post-edit/post-edit.service';
import { SettingAddComponent } from './admin/admin-main-area/category-setting/setting-add/setting-add.component';
import { SettingEditComponent } from './admin/admin-main-area/category-setting/setting-edit/setting-edit.component';
import { CategSettingService } from './admin/admin-main-area/category-setting/categ-setting.service';
import { CurrentCategService } from './admin/admin-main-area/category-setting/current-categ.service';
import { SettingSendService } from './admin/admin-main-area/category-setting/setting-add/setting.send.service';
import { CurrentSliderService } from './admin/admin-main-area/slider-page/current-slider.service';
import { SliderService } from './admin/admin-main-area/slider-page/slider.service';
import { SliderAddComponent } from './admin/admin-main-area/slider-page/slider-add/slider-add.component';
import { SliderEditComponent } from './admin/admin-main-area/slider-page/slider-edit/slider-edit.component';
import { SliderSendService } from './admin/admin-main-area/slider-page/slider-add/slider-send.service';
import { GuestHttpService } from './admin/admin-main-area/user-guest/guest-http.service';
import { GuestCurrentService } from './admin/admin-main-area/user-guest/guest-current.service';
import { GuestAddComponent } from './admin/admin-main-area/user-guest/guest-add/guest-add.component';
import { GuestEditComponent } from './admin/admin-main-area/user-guest/guest-edit/guest-edit.component';
import { AdmAddComponent } from './admin/admin-main-area/user-admin/adm-add/adm-add.component';
import { AdmEditComponent } from './admin/admin-main-area/user-admin/adm-edit/adm-edit.component';
import { AdmCurrentService } from './admin/admin-main-area/user-admin/adm-current.service';
import { Adm } from './admin/admin-main-area/user-admin/adm.model';
import { AdmHttpService } from './admin/admin-main-area/user-admin/adm-http.service';
import { AdmSignupService } from './admin/admin-main-area/user-admin/adm-signup.service';
import { CategoryCard2Component } from './main-page/category-page/category-card2/category-card2.component';
import { SearchCard2Component } from './main-page/search/search-card2/search-card2.component';



const appRoutes :Routes = [
  { path: '', redirectTo: '/landing-page', pathMatch: 'full'},
  {path:'side-nav',component:SideNavComponent ,
  children:[
  { path: 'main-page', component:MainPageComponent,
  children:[
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},
    {path: 'home-page',component: HomePageComponent},
    {path: 'category-page/:category',component: CategoryPageComponent},
    {path: 'detail-page',component: DetailPageComponent},
    {path: 'home-feature', component: HomeFeatureComponent},
    {path: 'search/:value',component: SearchComponent},
  ]
},
  ]},
{path: 'admin-page',component: AdminPageComponent,
children:[
  {path:'admin-login',component: AdminLoginComponent},
  {path:'admin-side-nav',component: AdminSideNavComponent,
  children:[
    {path:'admin-main-area',component: AdminMainAreaComponent,
    children:[
      {path:'admin-post-page',component: PostPageComponent},
      {path:'post-add',component:PostAddComponent},
      {path:'post-edit',component:PostEditComponent},
      
      {path:'admin-category-setting',component: CategorySettingComponent},
      {path:'setting-add',component:SettingAddComponent},
      {path:'setting-edit',component:SettingEditComponent},

      {path:'admin-user-guest',component: UserGuestComponent},
      {path:'guest-add',component:GuestAddComponent},
      {path:'guest-edit',component:GuestEditComponent},

      {path:'admin-user-admin',component: UserAdminComponent},
      {path:'adm-add',component:AdmAddComponent},
      {path:'adm-edit',component:AdmEditComponent},

      {path:'admin-slider-page',component: SliderPageComponent},
      {path:'slider-add',component: SliderAddComponent},
      {path:'slider-edit',component: SliderEditComponent},

      {path:'admin-notification-page',component: NotificationPageComponent},
      {path:'admin-ads',component: AdsComponent},
    ]
  }
  ]
},

]
},

]
@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MainPageComponent,
    HomePageComponent,
    HomeCardComponent,
    ProfileCardComponent,
    LoginComponent,
    SignupComponent,
    CategoryPageComponent,
    CategoryCardComponent,
    DetailPageComponent,
    HomeFeatureComponent,
    CatelogBoxComponent,
    CatelogCardComponent,
    SliderComponent,
    SearchComponent,
    SearchCardComponent,
    AdminPageComponent,
    AdminSideNavComponent,
    AdminLoginComponent,
    AdminMainAreaComponent,
    RoutingPageComponent,
    AdminProfileComponent,
    PostPageComponent,
    UserAdminComponent,
    UserGuestComponent,
    SliderPageComponent,
    NotificationPageComponent,
    AdsComponent,
    CategorySettingComponent,
    PostAddComponent,
    PostEditComponent,
    SettingAddComponent,
    SettingEditComponent,
    SliderAddComponent,
    SliderEditComponent,
    GuestAddComponent,
    GuestEditComponent,
    AdmAddComponent,
    AdmEditComponent,
    CategoryCard2Component,
    SearchCard2Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    CKEditorModule,
  ],
  providers: [LoadUserService,LoginService,ProfileInfoService,SignupService,PostCallService,PoststorageService
    ,PathBackService,CurrentPostService,PostSearchService,SliderCallService,AdminLoginService,ProfileAdminInfoService
    ,PostSendService,CurrentEditPostService,PostEditService,CategSettingService,CurrentCategService,SettingSendService
  ,CurrentSliderService,SliderService,SliderSendService,GuestHttpService,GuestCurrentService,AdmCurrentService,AdmHttpService
  ,AdmSignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
