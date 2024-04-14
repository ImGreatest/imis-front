import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import { TagService } from '../../common/services/api/tag.service';
import {
  ITreeTagElement,
  TagEvent,
  tagScore,
} from '../../common/interfaces/tag/tag.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'create-rating',
  templateUrl: './create-rating.component.html',
  styleUrl: './create-rating.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiInputNumberOptionsProvider({ step: 0.25, min: 0 })],
})
export class CreateRatingComponent implements OnInit {
  constructor(private tagService: TagService, private cdr: ChangeDetectorRef) {}
  tagsValue: ITreeTagElement[] = [];
  readonly rating = new FormGroup({
    name: new FormControl(''),
    hours: new FormControl(0),
  });
  ngOnInit(): void {
    this.tagService.getTreeTags(1).subscribe((tags) => {
      this.tagsValue = tags;

      this.cdr.markForCheck();
    });
  }
  private allValues: tagScore = {};
  onChildValueChange(event: TagEvent) {
    this.allValues[event.id] = event.score;
  }
  onSave() {
    console.log(this.rating.value);
    console.log(this.allValues);
  }
}
