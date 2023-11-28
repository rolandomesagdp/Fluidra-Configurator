import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonComponent, ActionButtonModule } from './action-button.component';
import { By } from '@angular/platform-browser';

describe('ActionButtonComponent', () => {
   let component: ActionButtonComponent;
   let fixture: ComponentFixture<ActionButtonComponent>;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [ ActionButtonModule ]
      });
      fixture = TestBed.createComponent(ActionButtonComponent);
      component = fixture.componentInstance;
      component.icon = "delete";
      component.text = "Delete";
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it("should not throw error if only the text is provided", () => {
      component.icon = "";
      expect(() => { component.ngOnInit() }).not.toThrowError();
   });

   it("should not throw error if only text is provided", () => {
      component.text = "";
      expect(() => { component.ngOnInit() }).not.toThrowError();
   });

   it("should throw the apropriate error", () => {
      component.icon = "";
      component.text = "";
      expect(() => { component.ngOnInit() }).toThrow(new Error('The action button requires either a text or an icon'));
   });

   it("should notify when button is clicked", () => {
      const onClickSpy = spyOn(component.onClick, "emit");
      const button = fixture.debugElement.query(By.css(".action_button")).nativeElement;

      button.click();
      expect(onClickSpy).toHaveBeenCalled();
   })
});

