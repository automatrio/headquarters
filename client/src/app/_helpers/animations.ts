import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const TIMING = '1000ms cubic-bezier(0.25, 0.8, 0.25, 1)';

export const slideAnimation = [
      trigger('slide',[
        transition('* => *',
          [ 
            query(
              ":enter",
              [
                stagger(
                  200,
                  animate(TIMING, style({ transform: 'translateX(0px)' }))
                  )
              ], {optional: true}),
              query(
                ":leave",
                [
                  stagger(
                    200,
                    animate(TIMING, style({ transform: 'translateX(-1500px)' }))
                    )
                ], {optional: true}),
          ])
      ])
]