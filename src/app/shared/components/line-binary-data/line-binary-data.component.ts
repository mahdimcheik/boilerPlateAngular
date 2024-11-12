import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-line-binary-data',
  templateUrl: './line-binary-data.component.html',
  styleUrl: './line-binary-data.component.scss',
  standalone: true,
  imports: [FieldsetModule, CommonModule],
})
export class LineBinaryDataComponent {
  @Input() key!: string;
  @Input() value!: string;
  @Input() order!: boolean;
}
