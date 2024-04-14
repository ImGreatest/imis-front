import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { tuiInputNumberOptionsProvider } from '@taiga-ui/kit';
import {
  ITreeTagElement,
  TagEvent,
} from '../../../common/interfaces/tag/tag.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'tags-tree',
  templateUrl: './tags-tree.component.html',
  styleUrls: ['./tags-tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiInputNumberOptionsProvider({ step: 0.25 })],
})
export class TagsTreeComponent implements OnInit {
  @Input() tagsValue: ITreeTagElement | undefined;
  @Output() onChildValueChange: EventEmitter<{ id: number; score: number }> =
    new EventEmitter();
  readonly tag = new FormGroup({
    score: new FormControl(0),
  });
  expanded: boolean = true;
  name = 'some';
  childTags: ITreeTagElement[] = [];
  valueChange() {
    this.onChildValueChange.emit({
      id: this.tagsValue?.id || 0,
      score: this.tag.value.score ?? 0,
    });
  }
  onChildInChildValueChange(event: TagEvent) {
    this.onChildValueChange.emit(event);
  }
  ngOnInit(): void {
    if (this.tagsValue) {
      this.name = this.tagsValue.name;
      this.childTags = this.tagsValue.childTags || [];

      if (this.tagsValue.ratingScope && this.tagsValue.ratingScope.length > 0) {
        this.tag.setValue({ score: this.tagsValue.ratingScope[0].ratingScore });
      }
    }
    this.valueChange();
    this.tag.valueChanges.subscribe(() => {
      this.valueChange();
    });
  }
  changeExpand() {
    this.expanded = !this.expanded;
  }
}
