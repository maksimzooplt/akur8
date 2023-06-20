import { CustomInputComponent } from '@akur8/shared-components';
import { PostsFacade } from '@akur8/state';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'akur8-create-post',
    standalone: true,
    imports: [CommonModule, CustomInputComponent, ReactiveFormsModule, MatButtonModule],
    template: `
        <form [formGroup]="addForm">
            <akur8-input [control]="addForm.get('name')" label="Title"></akur8-input>
            <akur8-input [control]="addForm.get('content')" label="Content"></akur8-input>
            <button
                [disabled]="addForm.invalid"
                mat-raised-button
                color="primary"
                (click)="addPost()"
            >
                Submit
            </button>
        </form>
    `,
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
    private fb = inject(FormBuilder);
    private postsFacade = inject(PostsFacade);

    addForm = this.fb.group({
        name: ['', Validators.required],
        content: ['', Validators.required],
    }) as any;

    addPost(): void {
        this.postsFacade.addTask({
            id: Math.random() * 100,
            name: this.addForm.controls.name.value!,
            content: this.addForm.controls.content.value!,
        });

        this.addForm.reset();
    }
}
