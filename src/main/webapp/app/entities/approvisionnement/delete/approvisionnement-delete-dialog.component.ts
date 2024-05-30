import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IApprovisionnement } from '../approvisionnement.model';
import { ApprovisionnementService } from '../service/approvisionnement.service';

@Component({
  standalone: true,
  templateUrl: './approvisionnement-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ApprovisionnementDeleteDialogComponent {
  approvisionnement?: IApprovisionnement;

  protected approvisionnementService = inject(ApprovisionnementService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.approvisionnementService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
