import { Component, Input, OnInit, WritableSignal, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  @Input() public post: Post | null = null;

  public likes: WritableSignal<number> = signal(0);
  public commentsAmount: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.likes.set(this.post?.likes || 0);
    this.commentsAmount.set(this.post?.comments.length || 0);
  }
}
