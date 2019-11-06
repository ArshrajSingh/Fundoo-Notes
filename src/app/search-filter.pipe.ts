import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(values: any[], searchText: string): any[] {
    let re = new RegExp(searchText);
    if (!values) { return []; }
    if (!searchText) { return values; }
    return values.filter((value) => {
      if (searchText.length >= 1) {
        let outputTitle = (value.title).match(re);
        let titleFound = true;
        if (outputTitle == null) {
          titleFound = false;
        }
        let outputDescription = (value.description).match(re);
        let descriptionFound = true;
        if (outputDescription == null) {
          descriptionFound = false;
        }
        if (titleFound || descriptionFound) {
          return true;
        }
        return false;
      } else {
        return false;
      }

    });
  }
}
