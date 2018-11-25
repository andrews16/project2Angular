import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submitted-new-rx-component',
  template: `
    <div class="modal-header">
        <h4 class="modal-title" id="successfully-added-prescription">Prescription Added</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        Prescription added sucessfully.
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Save click')">Continue</button>
    </div>
  `
})
export class SubmittedNewRxComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}
