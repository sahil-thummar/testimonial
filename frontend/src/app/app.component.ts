import { Component, OnInit } from '@angular/core';
import { HelperService } from './helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    title = 'frontend';

    testimonialList: any = [];
    constructor(public helper: HelperService) {
    }

    ngOnInit() {
        this.helper.http_get_method_requester('api/testimonial/get', (responseData) => {
            if (responseData && responseData.testimonials && responseData.testimonials.length) {
                this.testimonialList = responseData.testimonials;
                console.log("this.testimonialList : ", this.testimonialList);
            }
        });
    }
}