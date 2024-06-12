import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addComment, likePost } from '../../../app/reducers/feed-store/feed.actions';

import { FeedState } from '../../../app/reducers/feed-store/feed.reducer';
import { MaterialComponentsModule } from '../../modules/material-components.module';
import { Post } from '../../interfaces/post.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MaterialComponentsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() public post: Post | null = null;
  @Input() public index: number = 0;
  @Input() public readOnly: boolean = false;

  public addCommentField: FormControl = new FormControl('', Validators.required);
  public commentsAmount: WritableSignal<number> = signal(0);
  public elementId: WritableSignal<string> = signal('');
  public formGroup: FormGroup;
  public showCommentsForm: WritableSignal<boolean> = signal(false);
  public likes: WritableSignal<number> = signal(0);

  constructor(private store: Store<FeedState>) {
    this.formGroup = new FormGroup({
      addCommentField: this.addCommentField
    });
  }

  ngOnInit(): void {
    this.likes.set(this.post?.likes || 0);
    this.commentsAmount.set(this.post?.comments.length || 0);
    this.elementId.update(() => `post-container-${this.index}`);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.store.dispatch(
        addComment({ 
          postId: this.post!.id,
          content: this.addCommentField.value,
          userId: this.post!.userId
        })
      );
      this.onAddComment();
    }
  }

  public onLike(): void {
    this.store.dispatch(likePost({ postId: this.post!.id }));
  }

  public onAddComment(): void {
    this.showCommentsForm.update((value: boolean) => !value);
  }
}
