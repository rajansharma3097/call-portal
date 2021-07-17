import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeFilter'
})
export class ActiveFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value)return "Deactive";
     
       if(value)
        return "Active";

  }

}
