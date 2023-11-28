import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
   providedIn: "root"
})
export class ToolbarEvents {
   private processToolbarDisplaySubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	processToolbarDisplayEvent$: Observable<boolean> = this.processToolbarDisplaySubject$.asObservable();

   private mainToolbarDisplaySubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
   mainToolbarDisplayEvent$: Observable<boolean> = this.mainToolbarDisplaySubject$.asObservable();

   showProcessToolbar(): void {
      this.processToolbarDisplaySubject$.next(true);
   }

   hideProcessToolbar(): void {
      this.processToolbarDisplaySubject$.next(false);
   }

   showMainToolbar(): void {
      this.mainToolbarDisplaySubject$.next(true);
   }

   hideMainToolbar(): void {
      this.mainToolbarDisplaySubject$.next(false);
   }
}