import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(values: any[], searchText: string): any[] {
    var re = new RegExp(searchText);
    if (!values) return [];
    if (!searchText) return values;
    return values.filter((value) => {
      if (searchText.length >= 1) {
        var outputTitle = (value.title).match(re);
        var titleFound = true;
        if (outputTitle == null) {
          titleFound = false;
        }
        var outputDescription = (value.description).match(re);
        var descriptionFound = true;
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
