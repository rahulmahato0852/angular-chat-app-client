import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroMicrophone, heroPlus, heroUserGroup, heroUsers } from '@ng-icons/heroicons/outline';
import { bootstrapCameraVideo, bootstrapCaretDownFill, bootstrapChatDots, bootstrapCollection, bootstrapCollectionFill, bootstrapEmojiAstonished, bootstrapEmojiSmile, bootstrapEmojiSmileFill, bootstrapPeople, bootstrapPeopleFill, bootstrapSearch, bootstrapThreeDotsVertical, bootstrapWatch } from '@ng-icons/bootstrap-icons';
import { FooterComponent } from './footer/footer.component';
import { ChatNavbarComponent } from './chat-navbar/chat-navbar.component';
import { ChatsComponent } from './chats/chats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/reducers/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffect } from '../store/effects/user.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { chatReducer } from '../store/reducers/chat.reducer';
import { chatEffect } from '../store/effects/chat.effect';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    ChatNavbarComponent,
    ChatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      "userReducer", userReducer),
    StoreModule.forFeature(
      "chatReducer", chatReducer),
    EffectsModule.forFeature(UserEffect),
    EffectsModule.forFeature(chatEffect),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    UserRoutingModule,
    NgIconsModule.withIcons({
      heroUsers, heroUserGroup,
      bootstrapWatch,
      bootstrapSearch, bootstrapPeople,
      heroPlus,
      heroMicrophone,
      bootstrapEmojiSmile,
      bootstrapChatDots, bootstrapCameraVideo, bootstrapCaretDownFill, bootstrapThreeDotsVertical, bootstrapCollection
    }),
  ],
  exports: [
    HomeComponent
  ]
})
export class UserModule { }
