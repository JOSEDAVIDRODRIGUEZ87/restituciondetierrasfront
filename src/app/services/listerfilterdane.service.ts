import { Pipe, PipeTransform } from '@angular/core';

/*
Pipes are simple functions to use in template expressions to accept an input value and return a 
transformed value. Pipes are useful because you can use them throughout your application, while 
only declaring each pipe once.
*/

@Pipe({ name: 'listFilter2'})
export class ListFilterPipe2 implements PipeTransform {

    transform(list: any[], filterText: string): any {
        return list ? list.filter(item => item.departamento.search(new RegExp(filterText, 'i')) > -1) : [];
    }
}