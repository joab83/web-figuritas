import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartCustomer } from '../../../../core/models/cart.model';

@Component({
  selector: 'app-reservation-modal',
  imports: [FormsModule],
  templateUrl: './reservation-modal.component.html',
  styleUrl: './reservation-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationModalComponent {
  readonly cancelled = output<void>();
  readonly submitted = output<CartCustomer>();
  phone = '';
  name = '';

  submit(): void {
    const phone = this.phone.trim();
    if (!phone) {
      return;
    }

    this.submitted.emit({ phone, name: this.name.trim() });
  }
}
