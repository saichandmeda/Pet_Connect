import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string): any[] {
    const result:any =[];
    var propNameSplitted = propName.split(",");
    if(!value || filterString==='' || propName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      propNameSplitted.forEach(propName=>{
        if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
          result.push(a);
        }
      })
    });
    return result;
  }

}
