import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { TagService } from '../../common/services/api/tag.service';
import {
  ITreeTagElement,
  ITreeTagShowElement,
  TagEvent,
  tagScore,
} from '../../common/interfaces/tag/tag.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiInputNumberOptionsProvider({ step: 0.25, min: 0 })],
})
export class CreateRatingComponent implements OnInit {
  id: number = 0;

  constructor(
    private tagService: TagService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  tagsValue: ITreeTagShowElement[] = [];
  private tagsScore: tagScore = {};
  readonly rating = new FormGroup({
    name: new FormControl(''),
    hours: new FormControl(0),
  });
  private allValues: tagScore = {};

  getChildTag(tag: ITreeTagElement): ITreeTagShowElement {
    this.tagsScore[tag.id] =
      tag.ratingScope && tag.ratingScope.length > 0
        ? tag.ratingScope[0].ratingScore
        : 0;
    return {
      id: tag.id,
      name: tag.name,
      score:
        tag.ratingScope && tag.ratingScope.length > 0
          ? tag.ratingScope[0].ratingScore
          : 0,
      childs:
        tag.childTags.length > 0
          ? tag.childTags.map((childTag) => this.getChildTag(childTag))
          : [],
    };
  }
  onScoreChange($event: { id: number; score: number }) {
    this.tagsScore[$event.id] = $event.score;
    console.log(this.tagsScore);
  }
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.params['id']);
    this.tagService.getTreeTags(this.id).subscribe((tags) => {
      this.tagsValue = tags.map((tag) => this.getChildTag(tag));
      console.log(this.tagsValue);
      this.cdr.markForCheck();
    });
  }

  onChildValueChange(event: TagEvent): void {
    this.allValues[event.id] = event.score;
  }

  onSave(): void {
    console.log(this.rating.value);
    console.log(this.allValues);
  }
}
