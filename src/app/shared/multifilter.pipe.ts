// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'multifilter',
//   standalone: true
// })
// export class MultifilterPipe implements PipeTransform {

//   // transform(value: unknown, ...args: unknown[]): unknown {
//   transform(items : any[], searchKeys: string, searchText:string): any[] {
//     if (!items) return [];
//     if (!searchKeys || searchKeys.length === 0 || !searchText) return items;

//     searchText = searchText.toLowerCase();

//     return items.filter(item => {
//       return searchKeys.some(key => 
//         item[key] && item[key].toString().toLowerCase().includes(searchText)
//       );
//     });
//   }

// }


import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multifilter',
  standalone: true
})
export class MultifilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || propName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return value;
  }

}

