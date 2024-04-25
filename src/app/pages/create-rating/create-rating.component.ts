import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tuiInputNumberOptionsProvider} from '@taiga-ui/kit';
import {TagService} from '../../common/services/api/tag.service';
import {ITreeTagElement, ITreeTagShowElement, TagEvent, tagScore} from '../../common/interfaces/tag/tag.interface';
import {ActivatedRoute} from '@angular/router';
import {RatingService} from '../../common/services/api/rating.service';
import {ICreateRating} from '../../common/interfaces/rating/rating';
import {IScope} from '../../common/interfaces/rating/rating';

@Component({
    selector: 'app-create-rating',
    templateUrl: './create-rating.component.html',
    styleUrls: ['./create-rating.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [tuiInputNumberOptionsProvider({step: 0.25, min: 0})]
})
export class CreateRatingComponent implements OnInit {
    id : number = 0;

    constructor(private ratingService : RatingService, private tagService : TagService, private route : ActivatedRoute, private cdr : ChangeDetectorRef) {}

    tagsValue : ITreeTagShowElement[] = [];
    private tagsScore : tagScore = {};
    readonly rating = new FormGroup({
        name: new FormControl('', Validators.required),
        hours: new FormControl(0)
    });

    getChildTag(tag : ITreeTagElement) : ITreeTagShowElement {
        this.tagsScore[tag.id] = tag.ratingScope || 0;
        return {
            id: tag.id,
            name: tag.name,
            score: tag.ratingScope || 0,
            childs: tag.childTags.length > 0
                ? tag
                    .childTags
                    .map((childTag) => this.getChildTag(childTag))
                : []
        };
    }
    onScoreChange($event : {
        id: number;
        score: number
    }) {
        this.tagsScore[$event.id] = $event.score;
        console.log(this.tagsScore);
    }
    ngOnInit() : void {
        this.id = Number(this.route.snapshot.params['id']) || -5;
        this
            .tagService
            .getTreeTags(this.id)
            .subscribe((tags) => {
                this
                    .rating
                    .controls
                    .name
                    .setValue(tags.ratingName);
                this
                    .rating
                    .controls
                    .hours
                    .setValue(tags.hourlyUpdate);
                this.tagsValue = tags
                    .tag
                    .map((tag) => this.getChildTag(tag));
                console.log(this.tagsValue);
                this
                    .cdr
                    .markForCheck();
            });
    }

    onSave(): void {
      if (!this.rating.valid) {
        // Form is invalid, handle accordingly (e.g., display error message)
        return;
      }
    
      const name = this.rating.controls.name.value!;
      const hours = this.rating.controls.hours.value || 0;
    
      const scope: IScope[] = Object.entries(this.tagsScore).map(([tagId, ratingScore]) => ({
        tagId: +tagId,
        ratingScore
      }));
    
      console.log(name, hours, scope);
    
      if (this.id < 0) {
        // Creating a new rating
        const ratingBody: ICreateRating = {
          name,
          minuteUpdate: hours * 60,
          scope
        };
    
        this.ratingService.createRating(ratingBody)
          .subscribe(() => {
            console.log("Rating created");
            // Additional actions after successful creation
          }, error => {
            console.error("Failed to create rating:", error);
            // Handle error (e.g., display error message)
          });
      } else {
        // Updating an existing rating
        console.log("Update rating logic goes here");
      }
    }
    
}
