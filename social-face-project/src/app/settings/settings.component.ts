import { Actions, ofType } from '@ngrx/effects';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, map, take } from 'rxjs';
import { getSettings, updateSettings, updateSettingsFailure, updateSettingsSuccess } from '../reducers/settings-store/settings.actions';

import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../../shared/modules/material-components.module';
import { NotificationPreference } from '../../shared/enums/notification-preference.enum';
import { Settings } from '../../shared/interfaces/settings.interface';
import { Store } from '@ngrx/store';
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
  public isLoading: WritableSignal<boolean> = signal(false);
  public settings: WritableSignal<Settings | null> = signal(null);
  public notificationPreferenceFormControl: FormControl = new FormControl('');
  public profileVisibilityFormControl: FormControl = new FormControl(false);
  public usernameFormControl: FormControl = new FormControl('', Validators.required);
  public phoneFormControl: FormControl = new FormControl('', Validators.required);
  public formGroup: FormGroup;

  constructor(private actions$: Actions, private store: Store) {
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
    this.handleOnUpdateSuccess().subscribe();
    this.handleOnUpdateFailure().subscribe();
  }


  public getNotificationPreference(): string {
    switch (this.settings()!.notificationsPreference) {
      case NotificationPreference.email:
        return 'Email notifications';
      case NotificationPreference.browser:
        return 'Browser notifications';
      default:
        return 'No notifications';
    }
  }


  public getProfileVisibility(): string {
    if (!this.settings()) {
      return '';
    }
    return this.settings()!.profileVisibility ? 'Public' : 'Private';
  }

  public updateSettings(): void {
    this.isEditing.update((isEditMode) => !isEditMode);

    const notificationPreference = this.settings()!.notificationsPreference === NotificationPreference.email ? '1' : '2';
    
    this.formGroup.patchValue({
      notificationPreference: notificationPreference,
      profileVisibility: this.settings()!.profileVisibility,
      username: this.settings()!.username,
      phone: this.settings()!.phone,
    });
  }

  public exportToCSV(): void {
    if (!this.settings()) {
      return;
    }
    const setting = {
      username: this.settings()!.username,
      phone: this.settings()!.phone,
      notificationsPreference: this.getNotificationPreference(),
      profileVisibility: this.getProfileVisibility(),
    }

    const separator = ',';
    const keys = Object.keys(setting);
    const csvContent = [
      keys.join(separator),
      keys.map(k => {
        const key: keyof Settings = k as keyof Settings;
        return this.escapeCsvValue(setting[key]);
      }).join(separator)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.anchorTagAndDownload(blob, `${setting.username}_data.csv`);
  }

  public saveSettings(): void {
    if (this.formGroup.valid) {
      this.isLoading.update(() => true);
      const payload: Settings =  {
        username: this.usernameFormControl.value,
        phone: this.phoneFormControl.value,
        notificationsPreference: this.notificationPreferenceFormControl.value === '1' ? NotificationPreference.email : NotificationPreference.browser,
        profileVisibility: this.profileVisibilityFormControl.value,
      }
      this.store.dispatch(updateSettings({ settings: payload }));
    }
  }

  private anchorTagAndDownload(file: Blob, fileName: string): void {
    const link = document.createElement('a');
    const url = URL.createObjectURL(file);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private escapeCsvValue(value: any): string {
    if (value == null) {
      return '';
    }
    value = value.toString();
    if (value.search(/("|,|\n)/g) >= 0) {
      value = `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  }

  private getSettings(): Observable<void> {
    return this.store.select(getUserSettings).pipe(
      map((settings: Settings | null) => {
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

  private handleOnUpdateSuccess(): Observable<void> {
    return this.actions$.pipe(
      ofType(updateSettingsSuccess),
      map(() => {
        this.isLoading.update(() => false);
        this.isEditing.update(() => false);
      })
    );
  }

  private handleOnUpdateFailure(): Observable<void> {
    return this.actions$.pipe(
      ofType(updateSettingsFailure),
      map(() => {
        this.isLoading.update(() => false);
      })
    );
  }
}
