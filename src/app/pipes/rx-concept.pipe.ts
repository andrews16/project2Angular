import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rxConcept'
})
export class RxConceptPipe implements PipeTransform {

  transform(value: string): any {
    switch (value) {
      case 'BN': return 'Brand Name';
      case 'SBN': return 'Branded Drug';
      case 'BPCK': return 'Branded Drug Pack';
      case 'SBDC': return 'Branded Drug Component';
      case 'DF': return 'Dose Form';
      case 'DFG': return 'Dose Form Group';
      case 'SBDG': return 'Branded Dose Form Group';
      case 'GPCK': return 'Generic Pack';
      case 'SCD': return 'Clinical Drug';
      case 'IN': return 'Ingredient';
      case 'SCDC': return 'Clinical Drug Component';
      case 'MIN': return 'Multiple Ingredients';
      case 'SCDF': return 'Clinical Dose Form';
      case 'PIN': return 'Precise Ingredient';
      case 'SCDG': return 'Clinical Dose Form Group';
    }
    return value;
  }

}
