import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PurchaseStep {
  number: number;
  title: string;
  description: string;
}

interface CommonQuestion {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-how-to-buy-page',
  imports: [RouterLink],
  templateUrl: './how-to-buy-page.component.html',
  styleUrl: './how-to-buy-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HowToBuyPageComponent {
  readonly steps: PurchaseStep[] = [
    {
      number: 1,
      title: 'Revisá el catálogo',
      description: 'Entrá al inicio y buscá las figuritas que necesitás. El recuadro verde indica cuántas quedan; si aparece "Agotada", ya no hay unidades disponibles.'
    },
    {
      number: 2,
      title: 'Reservá tus elegidas',
      description: 'Cuando encuentres una figurita, usá la acción para reservarla. La primera vez te pediremos un teléfono para contactarte por WhatsApp.'
    },
    {
      number: 3,
      title: 'Controlá tu carrito',
      description: 'El carrito reúne todas tus selecciones y muestra cuántas figuritas guardaste. Cuando termines de buscar, abrilo para revisar el pedido.'
    },
    {
      number: 4,
      title: 'Mandá el pedido por WhatsApp',
      description: 'Desde el carrito enviá el pedido. WhatsApp se abrirá con el mensaje preparado para que solo tengas que enviarlo.'
    },
    {
      number: 5,
      title: 'Coordinamos la entrega',
      description: 'Te responderemos por WhatsApp para definir pago y entrega. Después de enviar el mensaje, las figuritas quedan reservadas por hasta 24 horas.'
    }
  ];

  readonly questions: CommonQuestion[] = [
    {
      question: '¿Tengo que pagar desde la web?',
      answer: 'No. Los precios son informativos. El pago se coordina por WhatsApp.'
    },
    {
      question: '¿Durante cuánto tiempo se guarda mi pedido?',
      answer: 'Tenés una hora para enviar el WhatsApp. Luego de enviarlo, mantenemos la reserva por 24 horas mientras coordinamos.'
    },
    {
      question: '¿Qué sucede si no completo el pedido?',
      answer: 'Las figuritas vuelven a quedar disponibles y podés comenzar otra selección cuando quieras.'
    },
    {
      question: '¿Otra persona puede reservar las mismas figuritas?',
      answer: 'Mientras estén guardadas en tu carrito, quedan bloqueadas para vos. Por eso el stock se actualiza en vivo.'
    }
  ];
}
