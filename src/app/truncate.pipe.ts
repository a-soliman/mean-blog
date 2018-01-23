import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(body: string, limit?: number): string {
    if ( body.length > 50 ) {
    	return body.substring(0, limit);
    }
    
    return body;
  }

}
