import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export class HttpLoaderFactory {

   static create(httpClient: HttpClient): TranslateHttpLoader {
      return new TranslateHttpLoader(httpClient);
   }
}