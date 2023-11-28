import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfiguratorLogoComponent } from './configurator-logo.component';
import { ConfiguratorTranslateTestModule } from 'configurator-core';
import { LogoModule } from '../logo.module';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { proApps } from './fluidra-pro-apps';

describe('ConfiguratorLogoComponent', async () => {
   let component: ConfiguratorLogoComponent;
   let fixture: ComponentFixture<ConfiguratorLogoComponent>;
   let loader: HarnessLoader;

   beforeEach(() => {
      TestBed.configureTestingModule({
         declarations: [ConfiguratorLogoComponent],
         imports: [
            LogoModule,
            ConfiguratorTranslateTestModule,
            NoopAnimationsModule
         ]
      });
      fixture = TestBed.createComponent(ConfiguratorLogoComponent);
      component = fixture.componentInstance;
      loader = TestbedHarnessEnvironment.loader(fixture);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it("should provide access to Fluidra Pro Academy", async () => {
      const windowSpy = spyOn(window, "open");
      const proAcademyApp = proApps.find(x => x.id === "fluidra-pro-academy");
      const configuratorLogoMenu = await loader.getHarness(MatMenuHarness);
      await configuratorLogoMenu.open();
      await configuratorLogoMenu.clickItem({ selector: `.${proAcademyApp.id}`})

      expect(windowSpy).toHaveBeenCalledWith(proAcademyApp.url, "_blank");
   });

   it("should provide access to Pro Zodiac Space", async () => {
      const windowSpy = spyOn(window, "open");
      const proZodiacSpace = proApps.find(x => x.id === "pro-zodiac-space");
      const configuratorLogoMenu = await loader.getHarness(MatMenuHarness);
      await configuratorLogoMenu.open();
      await configuratorLogoMenu.clickItem({ selector: `.${proZodiacSpace.id}`})

      expect(windowSpy).toHaveBeenCalledWith(proZodiacSpace.url, "_blank");
   });

   it("should provide access to Pool Comertial & Wellness", async () => {
      const windowSpy = spyOn(window, "open");
      const poolComertialAndWellness = proApps.find(x => x.id === "pool-comertial-and-wellness");
      const configuratorLogoMenu = await loader.getHarness(MatMenuHarness);
      await configuratorLogoMenu.open();
      await configuratorLogoMenu.clickItem({ selector: `.${poolComertialAndWellness.id}`})

      expect(windowSpy).toHaveBeenCalledWith(poolComertialAndWellness.url, "_blank");
   });

   it("should provide access to Fluidra Pro Club", async () => {
      const windowSpy = spyOn(window, "open");
      const fluidraProClub = proApps.find(x => x.id === "fluidra-pro-club");
      const configuratorLogoMenu = await loader.getHarness(MatMenuHarness);
      await configuratorLogoMenu.open();
      await configuratorLogoMenu.clickItem({ selector: `.${fluidraProClub.id}`})

      expect(windowSpy).toHaveBeenCalledWith(fluidraProClub.url, "_blank");
   });
});
