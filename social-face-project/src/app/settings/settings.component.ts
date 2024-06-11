import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, take } from 'rxjs';

import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../shared/modules/material-components.module';
import { NotificationPreference } from '../../shared/enums/notification-preference.enum';
import { Settings } from '../../shared/interfaces/settings.interface';
import { Store } from '@ngrx/store';
import { getSettings } from '../reducers/settings-store/settings.actions';
import { getUserId } from '../reducers/user-store/user.selectors';
import { getUserSettings } from '../reducers/settings-store/settings.selectors';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialComponentsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  public isEditing: WritableSignal<boolean> = signal(false);
  public settings: WritableSignal<Settings | null> = signal(null);
  public notificationPreferenceFormControl: FormControl = new FormControl(0);
  public profileVisibilityFormControl: FormControl = new FormControl(false);
  public usernameFormControl: FormControl = new FormControl('', Validators.required);
  public phoneFormControl: FormControl = new FormControl('', Validators.required);
  public formGroup: FormGroup;

  constructor(private store: Store) {
    this.formGroup = new FormGroup({
      notificationPreference: this.notificationPreferenceFormControl,
      profileVisibility: this.profileVisibilityFormControl,
      username: this.usernameFormControl,
      phone: this.phoneFormControl,
    });
  }

  ngOnInit(): void {
    this.fetchSettings().subscribe();
    this.getSettings().subscribe();
  }


  public getNotificationPreference(): string {
    switch (this.settings()!.notificationsPreference) {
      case NotificationPreference.browser:
        return 'Browser notifications';
      case NotificationPreference.email:
        return 'Email notifications';
      default:
        return 'No notifications';
    }
  }


  public getProfileVisibility(): string {
    if (this.settings()?.profileVisibility) {
      return '';
    }
    return this.settings()!.profileVisibility ? 'Public' : 'Private';
  }

  public updateSettings(): void {
    this.isEditing.update((isEditMode) => !isEditMode);
    this.formGroup.patchValue({
      notificationPreference: this.settings()!.notificationsPreference,
      profileVisibility: this.settings()!.profileVisibility,
      username: this.settings()!.username,
      phone: this.settings()!.phone,
    });
  }

  public exportToCSV(): void {
    
  }

  public saveSettings(): void {
    if (this.formGroup.valid) {
      this.isEditing.update((isEditMode) => !isEditMode);
    }
  }

  private getSettings(): Observable<void> {
    return this.store.select(getUserSettings).pipe(
      map((settings: Settings | null) => {
        console.log('settings select');
        console.log(settings);
        if (settings) {
          this.settings.set(settings);
        }
      })
    );
  }

  private fetchSettings(): Observable<void> {
    return this.store.select(getUserId).pipe(
      take(1),
      map((userId) => {
        if (userId) {
          this.store.dispatch(getSettings({ userId }));
        }
      })
    );
  }
}
