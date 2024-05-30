import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatRadioModule } from "@angular/material/radio";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatRadioModule
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatRadioModule
    ]
})

export class MaterialComponentsModule {
}